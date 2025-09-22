import { openai } from "../utils/opneaiClient.js";
import { supabase } from "../utils/supabaseClient.js";

export const resultSummary = async (req , res) => {
    try {
        const { poll_id } = req.body;
    
        // 1. Fetch poll results
        const { data: results, error } = await supabase
          .from("votes")
          .select("candidate_id, candidates(name)")
          .eq("poll_id", poll_id);
    
        if (error) return res.status(400).json({ error: error.message });
    
        if (!results || results.length === 0) {
          return res.json({ summary: "No votes have been cast for this poll yet." });
        }
    
        // Format results into plain text for AI
        const votesByCandidate = results.reduce((acc, v) => {
          const name = v.candidates?.name || "Unknown";
          acc[name] = (acc[name] || 0) + 1;
          return acc;
        }, {});
    
        const resultText = Object.entries(votesByCandidate)
          .map(([name, count]) => `${name}: ${count} votes`)
          .join("\n");
    
        // 2. Summarize with OpenAI
        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are an election results summarizer." },
            { role: "user", content: `Summarize these poll results:\n${resultText} and also tell who won and congratulate them and also compare their votes` }
          ]
        });
    
        const summary = response.choices[0].message.content;
        res.json({ summary });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to generate summary." });
      }
}