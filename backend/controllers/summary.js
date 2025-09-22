import { openai } from "../utils/openaiClient.js";

export const summarize = async (req, res) => {
    try {
        const { manifesto } = req.body;
        const response = await openai.chat.completions.create(
            {
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a student friendly content summarizer." },
                    { role: "user", content: `Summarize this manifesto in the small and easy manner:\n\n${manifesto}` }
                ],
            });
        res.json({ summary: response.choices[0].message.content });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to summarize" });
    }
}