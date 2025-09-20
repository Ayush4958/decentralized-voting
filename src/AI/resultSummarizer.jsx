import { useState } from "react";

export default function ResultSummary({ selectedPollId: pollId })
 {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateSummary = async () => {
    setLoading(true);
    setError("");
    setSummary("");

    try {
      const res = await fetch("https://decentralized-voting-1.onrender.com/result-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ poll_id: pollId })
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setSummary(data.summary);
      }
    } catch (err) {
      setError("Failed to fetch result summary.");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 bg-white shadow rounded mt-6">
      <h2 className="text-xl font-bold mb-4">📊 Result Summary</h2>

      <button
        onClick={handleGenerateSummary}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {loading ? "Generating..." : "Generate Summary"}
      </button>

      {summary && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold">AI Summary:</h3>
          <p>{summary}</p>
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
