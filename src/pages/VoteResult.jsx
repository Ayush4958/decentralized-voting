import { useEffect, useState } from 'react'
import { supabase } from '../api/supabaseClient'
import ResultSummary from '../AI/resultSummarizer'
import loader from '../defined_UI/loader'

export default function VoteResults() {
  const [polls, setPolls] = useState([])
  const [selectedPollId, setSelectedPollId] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPolls = async () => {
      const { data, error } = await supabase
        .from('polls')
        .select('id, title')
        .order('created_at', { ascending: false })

      if (!error) setPolls(data)
    }

    fetchPolls()
  }, [])

  useEffect(() => {
    if (!selectedPollId) return

    const fetchResults = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('candidates')
        .select('id, name, poll_id, votes(id)')
        .eq('poll_id', selectedPollId)

      if (!error) {
        // Transform result to include vote count
        const processed = data.map((candidate) => ({
          name: candidate.name,
          voteCount: candidate.votes.length
        }))
        setResults(processed)
      }

      setLoading(false)
    }

    fetchResults()
  }, [selectedPollId])

  return (
    <>
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md p-6 rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">📊 Vote Results</h2>

      <label className="block mb-2 font-semibold">Select a Poll</label>
      <select
        className="w-full border px-3 py-2 rounded mb-6"
        value={selectedPollId}
        onChange={(e) => setSelectedPollId(e.target.value)}
      >
        <option value="">-- Select --</option>
        {polls.map((poll) => (
          <option key={poll.id} value={poll.id}>
            {poll.title}
          </option>
        ))}
      </select>

      {loading && <p className="text-center text-gray-600">Loading results...</p>}

      {!loading && results.length > 0 && (
        <div>
          {results.map((result, index) => (
            <div
              key={index}
              className="border p-4 rounded mb-3 shadow-sm bg-gray-50"
            >
              <p className="font-bold">{result.name}</p>
              <p className="text-blue-600 font-semibold">
                Votes: {result.voteCount}
              </p>
            </div>
          ))}
        </div>
      )}

      <ResultSummary selectedPollId={selectedPollId} />

      {!loading && selectedPollId && results.length === 0 && (
        <p className="text-gray-500 text-center">No votes yet for this poll.</p>
      )}
    </div>

    </>
  )
}
