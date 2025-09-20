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

  // Calculate total votes and percentages
  const totalVotes = results.reduce((sum, result) => sum + result.voteCount, 0)
  const resultsWithPercentage = results.map(result => ({
    ...result,
    percentage: totalVotes > 0 ? (result.voteCount / totalVotes) * 100 : 0
  })).sort((a, b) => b.voteCount - a.voteCount) // Sort by vote count descending

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#b2aeab]/20 via-white to-[#ae796a]/10 py-8 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#ae796a]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#2a4669]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#102842]/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#102842] to-[#2a4669] rounded-2xl shadow-lg mb-6">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#102842] mb-4">
            Vote Results
          </h1>
          <p className="text-lg text-[#30424b]/70 max-w-2xl mx-auto">
            Explore the outcomes of democratic participation. View detailed results and insights from completed polls.
          </p>
        </div>

        {/* Main Container */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl border border-[#ae796a]/20 overflow-hidden">
          <div className="p-8 sm:p-12">
            
            {/* Poll Selector Section */}
            <div className="space-y-6 mb-10">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-[#ae796a] to-[#b2aeab] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <label className="text-xl font-bold text-[#102842]">Select a Poll to View Results</label>
              </div>
              
              <div className="relative">
                <select
                  className="w-full bg-white border-2 border-[#b2aeab]/30 focus:border-[#ae796a] focus:ring-4 focus:ring-[#ae796a]/20 px-6 py-4 rounded-xl text-lg font-medium text-[#102842] transition-all duration-300 appearance-none cursor-pointer shadow-sm hover:shadow-md"
                  value={selectedPollId}
                  onChange={(e) => setSelectedPollId(e.target.value)}
                >
                  <option value="" className="text-[#30424b]/60">-- Select a Poll --</option>
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
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-16 space-y-6">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-[#b2aeab]/30 border-t-[#ae796a] rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-[#2a4669]/50 rounded-full animate-spin animate-reverse"></div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#102842] mb-2">Loading Results...</h3>
                  <p className="text-[#30424b]/60">Fetching the latest vote data</p>
                </div>
              </div>
            )}

            {/* Results Section */}
            {!loading && results.length > 0 && (
              <div className="space-y-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#2a4669] to-[#30424b] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <h2 className="text-xl font-bold text-[#102842]">Election Results</h2>
                </div>

                {/* Results Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-[#102842]/5 to-[#2a4669]/5 rounded-2xl p-6 border border-[#b2aeab]/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#102842] to-[#2a4669] rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#30424b]/60">Total Votes</p>
                        <p className="text-2xl font-bold text-[#102842]">{totalVotes}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#ae796a]/5 to-[#b2aeab]/5 rounded-2xl p-6 border border-[#b2aeab]/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#ae796a] to-[#b2aeab] rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#30424b]/60">Candidates</p>
                        <p className="text-2xl font-bold text-[#102842]">{results.length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#30424b]/5 to-[#2a4669]/5 rounded-2xl p-6 border border-[#b2aeab]/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#30424b] to-[#2a4669] rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#30424b]/60">Winner</p>
                        <p className="text-lg font-bold text-[#102842] truncate">
                          {resultsWithPercentage[0]?.name || 'TBD'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Results */}
                <div className="space-y-4">
                  {resultsWithPercentage.map((result, index) => (
                    <div
                      key={index}
                      className="group relative bg-white border-2 border-[#b2aeab]/30 hover:border-[#ae796a]/50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      {/* Winner Badge */}
                      {index === 0 && totalVotes > 0 && (
                        <div className="absolute -top-3 -right-3">
                          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center space-x-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span>WINNER</span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          {/* Position Badge */}
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white ${
                            index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-500' :
                            index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-500' :
                            index === 2 ? 'bg-gradient-to-br from-yellow-600 to-yellow-700' :
                            'bg-gradient-to-br from-[#102842] to-[#2a4669]'
                          }`}>
                            <span className="text-lg">#{index + 1}</span>
                          </div>

                          {/* Candidate Info */}
                          <div>
                            <h3 className="text-xl font-bold text-[#102842] group-hover:text-[#2a4669] transition-colors">
                              {result.name}
                            </h3>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-2xl font-bold text-[#ae796a]">
                                {result.voteCount} votes
                              </span>
                              <span className="text-lg font-semibold text-[#30424b]/70">
                                {result.percentage.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-[#b2aeab]/20 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${
                            index === 0 ? 'bg-gradient-to-r from-[#ae796a] to-[#102842]' :
                            'bg-gradient-to-r from-[#30424b] to-[#2a4669]'
                          }`}
                          style={{ 
                            width: `${result.percentage}%`,
                            animation: `slideIn 1s ease-out ${index * 0.1}s both`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Result Summary */}
            {selectedPollId && (
              <div className="mt-12 space-y-6 border-t border-[#b2aeab]/20 pt-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#ae796a] to-[#102842] rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#102842]">AI Analysis & Insights</h3>
                </div>
                
                <div className="bg-gradient-to-r from-[#30424b]/5 to-[#2a4669]/5 rounded-2xl p-8 border border-[#b2aeab]/20">
                  <ResultSummary selectedPollId={selectedPollId} />
                </div>
              </div>
            )}

            {/* No Results State */}
            {!loading && selectedPollId && results.length === 0 && (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#b2aeab]/20 rounded-full mb-6">
                  <svg className="w-10 h-10 text-[#30424b]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#102842] mb-2">No Votes Yet</h3>
                <p className="text-lg text-[#30424b]/60 max-w-md mx-auto">
                  This poll hasn't received any votes yet. Check back later to see the results!
                </p>
              </div>
            )}

          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            width: 0;
          }
          to {
            width: var(--final-width);
          }
        }
      `}</style>
    </div>
  )
}