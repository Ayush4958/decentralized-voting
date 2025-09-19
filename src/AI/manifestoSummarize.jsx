import { useState } from "react";

export default function ManifestoSummary({ manifesto }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ manifesto }),
      });

      const data = await response.json();
      setSummary(data.summary || "⚠️ Failed to summarize.");
    } catch (error) {
      console.error(error);
      setSummary("⚠️ Error contacting server.");
    }
    setLoading(false);
  };

  return (
    <div className="mt-4 p-4 border rounded bg-gray-50">
      <h3 className="font-bold mb-2">Candidate Manifesto</h3>
      <p className="text-sm mb-3">{manifesto}</p>

      <button
        onClick={handleSummarize}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? "Summarizing..." : "Summarize Manifesto"}
      </button>

      {summary && (
        <div className="mt-3 p-3 bg-green-100 rounded">
          <strong>Summary:</strong>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}
