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
    <div className="min-h-screen bg-gradient-to-br from-[#b2aeab]/20 via-white to-[#ae796a]/10 py-8 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#ae796a]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#2a4669]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#102842] to-[#2a4669] rounded-2xl shadow-lg mb-6">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#102842] mb-4">
            Cast Your Vote
          </h1>
          <p className="text-lg text-[#30424b]/70 max-w-2xl mx-auto">
            Make your voice heard in the democratic process. Select a poll and choose your preferred candidate.
          </p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl border border-[#ae796a]/20 overflow-hidden">
          <div className="p-8 sm:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Poll Selector Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#ae796a] to-[#b2aeab] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <label className="text-xl font-bold text-[#102842]">Select a Poll</label>
                </div>
                
                <div className="relative">
                  <select
                    {...register('poll_id', { required: 'Please select a poll' })}
                    className="w-full bg-white border-2 border-[#b2aeab]/30 focus:border-[#ae796a] focus:ring-4 focus:ring-[#ae796a]/20 px-6 py-4 rounded-xl text-lg font-medium text-[#102842] transition-all duration-300 appearance-none cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <option value="" className="text-[#30424b]/60">-- Choose a Poll --</option>
                    {polls.map((poll) => (
                      <option key={poll.id} value={poll.id} className="text-[#102842]">
                        {poll.title}
                      </option>
                    ))}
                  </select>
                  
                  {/* Custom dropdown arrow */}
                  <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                    <svg className="w-5 h-5 text-[#ae796a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {errors.poll_id && (
                  <div className="flex items-center space-x-2 text-red-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="font-medium">{errors.poll_id.message}</p>
                  </div>
                )}
              </div>

              {/* Candidates Section */}
              {selectedPollId && candidates.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#2a4669] to-[#30424b] rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <label className="text-xl font-bold text-[#102842]">Select Your Candidate</label>
                  </div>
                  
                  <div className="grid gap-4 sm:gap-6">
                    {candidates.map((candidate) => (
                      <label
                        key={candidate.id}
                        className={`group relative flex items-start space-x-4 p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                          hasVoted 
                            ? 'border-[#b2aeab]/30 bg-[#b2aeab]/5 cursor-not-allowed opacity-60' 
                            : 'border-[#b2aeab]/30 bg-white hover:border-[#ae796a] hover:bg-[#ae796a]/5 hover:shadow-lg hover:-translate-y-1'
                        }`}
                      >
                        {/* Radio Button */}
                        <div className="relative flex-shrink-0 mt-1">
                          <input
                            type="radio"
                            value={candidate.id}
                            {...register('candidate_id', {
                              required: 'Please select a candidate'
                            })}
                            disabled={hasVoted}
                            className="w-5 h-5 text-[#ae796a] border-2 border-[#b2aeab] focus:ring-[#ae796a]/50 focus:ring-4 disabled:opacity-50"
                          />
                        </div>
                        
                        {/* Candidate Info */}
                        <div className="flex-grow space-y-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#102842] to-[#2a4669] rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {candidate.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold text-[#102842] group-hover:text-[#2a4669] transition-colors">
                              {candidate.name}
                            </h3>
                          </div>
                          
                          <div className="bg-[#30424b]/5 rounded-xl p-4">
                            <p className="text-[#30424b] leading-relaxed">
                              {candidate.manifesto || 'No manifesto provided.'}
                            </p>
                          </div>
                        </div>
                        
                        {/* Selection indicator */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-6 h-6 bg-[#ae796a] rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  
                  {errors.candidate_id && (
                    <div className="flex items-center space-x-2 text-red-500 mt-4">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <p className="font-medium">{errors.candidate_id.message}</p>
                    </div>
                  )}
                </div>
              )}

              {/* AI Summarizer Section */}
              {candidates.length > 0 && (
                <div className="space-y-6 border-t border-[#b2aeab]/20 pt-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#ae796a] to-[#102842] rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#102842]">AI Analysis</h3>
                  </div>
                  
                  <div className="grid gap-6">
                    {candidates.map((candidate) => (
                      <div key={candidate.id} className="bg-gradient-to-r from-[#30424b]/5 to-[#2a4669]/5 rounded-2xl p-6 border border-[#b2aeab]/20">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-8 h-8 bg-[#102842] rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xs">
                              {candidate.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-[#102842]">{candidate.name}</h4>
                        </div>
                        <ManifestoSummary manifesto={candidate.manifesto} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              {!hasVoted && selectedPollId && candidates.length > 0 && (
                <div className="pt-8">
                  <button
                    type="submit"
                    className="group relative w-full px-8 py-5 bg-gradient-to-r from-[#102842] via-[#2a4669] to-[#30424b] hover:from-[#2a4669] hover:via-[#30424b] hover:to-[#102842] text-white font-bold text-xl tracking-wide rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ease-out overflow-hidden"
                  >
                    {/* Animated background overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out"></div>
                    
                    {/* Button content */}
                    <div className="relative flex items-center justify-center space-x-4">
                      <svg 
                        className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg sm:text-xl font-bold">Submit Your Vote</span>
                      <svg 
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>

                    {/* Subtle border effect */}
                    <div className="absolute inset-0 rounded-2xl border border-[#ae796a]/20 group-hover:border-[#ae796a]/40 transition-colors duration-300"></div>
                    
                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-3/4 h-1 bg-gradient-to-r from-transparent via-[#ae796a] to-transparent transition-all duration-500 ease-out rounded-full"></div>
                  </button>
                </div>
              )}

              {/* Already Voted State */}
              {hasVoted && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Vote Submitted!</h3>
                  <p className="text-green-700 text-lg">
                    You have already voted in this poll. Thank you for participating!
                  </p>
                </div>
              )}

              {/* Success Message */}
              {successMsg && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-xl font-bold text-green-800">{successMsg}</p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {errorMsg && (
                <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl p-6">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-xl font-bold text-red-800">{errorMsg}</p>
                  </div>
                </div>
              )}

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}