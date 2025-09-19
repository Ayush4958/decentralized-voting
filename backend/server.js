// backend/server.js
import dotenv from "dotenv";
dotenv.config(); // MUST come first

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { supabase } from "./supabaseClient.js";
import OpenAI from "openai";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Route for manifesto summarizer
app.post("/summarize", async (req, res) => {
  try {
    const { manifesto } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a student friendly content summarizer." },
        { role: "user", content: `Summarize this manifesto in the small and easy manner:\n\n${manifesto}` }
      ],
    });
    res.json({ summary: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to summarize" });
  }
});

// Route for Result Summarizer
app.post("/result-summary", async (req, res) => {
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
        { role: "user", content: `Summarize these poll results:\n${resultText}` }
      ]
    });

    const summary = response.choices[0].message.content;

    res.json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate summary." });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
