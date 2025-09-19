import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { supabase } from '../api/supabaseClient'
import ManifestoSummary from '../AI/manifestoSummarize'


export default function VotePage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const [user, setUser] = useState(null)
  const [polls, setPolls] = useState([])
  const [candidates, setCandidates] = useState([])
  const [hasVoted, setHasVoted] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const selectedPollId = watch('poll_id')

  // ✅ Fetch user and active polls
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      setUser(user)

      const { data: pollsData } = await supabase
  .from('polls')
  .select('id, title, start_time, end_time')

      setPolls(pollsData || [])
    }

    fetchData()
  }, [])

  // ✅ When a poll is selected, fetch candidates and vote status
  useEffect(() => {
    const fetchCandidatesAndVoteStatus = async () => {
      if (!selectedPollId || !user) return

      const { data: candidateData } = await supabase
        .from('candidates')
        .select('id, name, manifesto')
        .eq('poll_id', selectedPollId)

      const { data: voteData } = await supabase
        .from('votes')
        .select('id')
        .eq('voter_id', user.id)
        .eq('poll_id', selectedPollId)

      setCandidates(candidateData || [])
      setHasVoted(voteData && voteData.length > 0)
    }

    fetchCandidatesAndVoteStatus()
  }, [selectedPollId, user])

  // ✅ Handle Vote Submission
  const onSubmit = async ({ poll_id, candidate_id }) => {
    setSuccessMsg('')
    setErrorMsg('')

    const { error } = await supabase.from('votes').insert([
      {
        voter_id: user.id,
        poll_id,
        candidate_id
      }
    ])

    if (error) {
      setErrorMsg(error.message)
    } else {
      setSuccessMsg('🎉 Vote cast successfully!')
      setHasVoted(true)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">🗳️ Cast Your Vote</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Poll Selector */}
        <label className="block mb-2 font-semibold">Select a Poll</label>
        <select
          {...register('poll_id', { required: 'Please select a poll' })}
          className="w-full border px-3 py-2 rounded mb-4"
        >
          <option value="">-- Choose --</option>
          {polls.map((poll) => (
            <option key={poll.id} value={poll.id}>
              {poll.title}
            </option>
          ))}
        </select>
        {errors.poll_id && <p className="text-red-500">{errors.poll_id.message}</p>}

        {/* Candidates */}
        {selectedPollId && candidates.length > 0 && (
          <>
            <label className="block mb-2 mt-4 font-semibold">Select Candidate</label>
            <div className="space-y-3">
              {candidates.map((candidate) => (
                <label
                  key={candidate.id}
                  className="flex items-start gap-2 p-3 border rounded shadow-sm bg-gray-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    value={candidate.id}
                    {...register('candidate_id', {
                      required: 'Please select a candidate'
                    })}
                    disabled={hasVoted}
                  />
                  <div>
                    <p className="font-bold">{candidate.name}</p>
                    <p className="text-sm text-gray-600">
                      {candidate.manifesto || 'No manifesto provided.'}
                    </p>
                  </div>
                </label>
              ))}
            </div>
            {errors.candidate_id && (
              <p className="text-red-500 mt-2">{errors.candidate_id.message}</p>
            )}
          </>
        )}

        {/* AI Summarizer Part */}
        {candidates.map((candidate) => (
  <div key={candidate.id}>
    <p className="font-bold">{candidate.name}</p>
    <ManifestoSummary manifesto={candidate.manifesto} />
  </div>
))}


        {/* Submit Button */}
        {!hasVoted && selectedPollId && candidates.length > 0 && (
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          >
            Submit Vote
          </button>
        )}

        {/* Already Voted */}
        {hasVoted && (
          <p className="text-green-600 mt-6 font-semibold text-center">
            ✅ You have already voted in this poll.
          </p>
        )}

        {/* Feedback */}
        {successMsg && <p className="text-green-600 mt-4 text-center">{successMsg}</p>}
        {errorMsg && <p className="text-red-600 mt-4 text-center">{errorMsg}</p>}
      </form>
    </div>
  )
}
