import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { supabase } from '../api/supabaseClient'

export default function AddCandidate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm()

  const [polls, setPolls] = useState([])
  const [user, setUser] = useState(null)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Watch form fields for dynamic validation
  const watchedFields = watch()

  // ✅ Fetch polls created by the current admin
  useEffect(() => {
    const fetchPollsAndUser = async () => {
      setIsLoading(true)
      const {
        data: { user }
      } = await supabase.auth.getUser()
      if (!user) return

      setUser(user)

      const { data, error } = await supabase
        .from('polls')
        .select('id, title')
        .eq('created_by', user.id)

      if (!error) setPolls(data)
      setIsLoading(false)
    }

    fetchPollsAndUser()
  }, [])

  // ✅ On submit, insert candidate into Supabase
  const onSubmit = async (formData) => {
    setIsSubmitting(true)
    setSuccessMsg('')
    setErrorMsg('')

    const { poll_id, name, manifesto } = formData

    const { error } = await supabase.from('candidates').insert([
      {
        poll_id,
        name,
        manifesto,
        created_by: user.id
      }
    ])

    if (error) {
      setErrorMsg(error.message)
    } else {
      setSuccessMsg('Candidate added successfully!')
      reset()
    }
    
    setIsSubmitting(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#102842] via-[#2a4669] to-[#30424b] flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-[#ae796a]/30 border-t-[#ae796a] rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-[#b2aeab]/50 rounded-full animate-spin animate-reverse"></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Your Polls...</h2>
          <p className="text-[#b2aeab]">Preparing the candidate registration system</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#102842] via-[#2a4669] to-[#30424b] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#ae796a]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#b2aeab]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-[#ae796a]/5 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-[#b2aeab]/5 rounded-full blur-2xl animate-float-delayed"></div>
        
        {/* Floating Candidate Elements */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-particle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            {i % 5 === 0 && <div className="w-4 h-4 bg-[#ae796a] rounded-full"></div>}
            {i % 5 === 1 && <div className="w-3 h-8 bg-[#b2aeab] rounded-full"></div>}
            {i % 5 === 2 && <div className="w-6 h-3 bg-[#ae796a] rounded-full"></div>}
            {i % 5 === 3 && <div className="w-5 h-5 bg-[#b2aeab] rounded-sm rotate-45"></div>}
            {i % 5 === 4 && <div className="w-4 h-6 bg-[#ae796a] rounded-lg rotate-12"></div>}
          </div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#ae796a] to-[#b2aeab] rounded-3xl shadow-2xl mb-8 animate-bounce-slow">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Register
              <span className="block bg-gradient-to-r from-[#ae796a] via-[#b2aeab] to-[#ae796a] bg-clip-text text-transparent animate-gradient-x">
                Champions
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-[#b2aeab] max-w-3xl mx-auto leading-relaxed">
              Add visionary candidates to your polls. Build the roster of leaders who will shape tomorrow's decisions and drive democratic progress.
            </p>
            
            <div className="mt-8 flex items-center justify-center space-x-2">
              <div className="flex space-x-1">
                {[1,2,3].map((step) => (
                  <div key={step} className="w-4 h-4 rounded-full bg-[#ae796a]/30">
                    <div className="w-full h-full rounded-full bg-[#ae796a] animate-pulse"></div>
                  </div>
                ))}
              </div>
              <span className="text-[#b2aeab] text-sm font-medium ml-3">3 Simple Steps</span>
            </div>
          </div>

          {/* No Polls State */}
          {polls.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-[#30424b]/20 rounded-full mb-8">
                <svg className="w-12 h-12 text-[#b2aeab]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">No Polls Available</h3>
              <p className="text-lg text-[#b2aeab] max-w-md mx-auto mb-8">
                You need to create a poll first before adding candidates. Start building your democratic process!
              </p>
              <button className="px-8 py-4 bg-gradient-to-r from-[#ae796a] to-[#b2aeab] text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                Create Your First Poll
              </button>
            </div>
          )}

          {/* Main Form Container */}
          {polls.length > 0 && (
            <div className="relative">
              {/* Success/Error Messages Floating */}
              {(successMsg || errorMsg) && (
                <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
                  {successMsg && (
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="font-bold text-lg">{successMsg}</span>
                    </div>
                  )}
                  
                  {errorMsg && (
                    <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="font-bold text-lg">{errorMsg}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-4xl border border-[#ae796a]/20 overflow-hidden">
                <div className="bg-gradient-to-r from-[#ae796a]/20 via-[#b2aeab]/20 to-[#ae796a]/20 p-8 sm:p-12">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Candidate Registry</h2>
                      <p className="text-[#b2aeab] text-lg">Building tomorrow's leadership today</p>
                    </div>
                    <div className="hidden sm:block">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#102842] to-[#2a4669] rounded-2xl flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 sm:p-12 space-y-10">
                  
                  {/* Poll Selection */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#ae796a] to-[#b2aeab] rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                        1
                      </div>
                      <div>
                        <label className="text-2xl font-bold text-white block">Select Target Poll</label>
                        <p className="text-[#b2aeab] mt-1">Choose which election this candidate will participate in</p>
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <select
                        {...register('poll_id', { required: 'Please select a poll' })}
                        className="w-full bg-white/5 border-2 border-[#b2aeab]/30 focus:border-[#ae796a] focus:bg-white/10 px-6 py-5 rounded-2xl text-white text-lg font-medium transition-all duration-300 hover:border-[#ae796a]/60 group-hover:shadow-lg backdrop-blur-sm appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-[#102842] text-white">-- Select a Poll --</option>
                        {polls.map((poll) => (
                          <option key={poll.id} value={poll.id} className="bg-[#102842] text-white">
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
                      
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#ae796a]/5 to-[#b2aeab]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    
                    {errors.poll_id && (
                      <div className="flex items-center space-x-2 text-red-400 animate-shake">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <p className="font-semibold">{errors.poll_id.message}</p>
                      </div>
                    )}
                  </div>

                  {/* Candidate Name */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#2a4669] to-[#30424b] rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                        2
                      </div>
                      <div>
                        <label className="text-2xl font-bold text-white block">Candidate Name</label>
                        <p className="text-[#b2aeab] mt-1">The leader who will represent this vision</p>
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        className="w-full bg-white/5 border-2 border-[#b2aeab]/30 focus:border-[#ae796a] focus:bg-white/10 px-6 py-5 rounded-2xl text-white text-lg font-medium placeholder-[#b2aeab]/60 transition-all duration-300 hover:border-[#ae796a]/60 group-hover:shadow-lg backdrop-blur-sm"
                        placeholder="e.g., 'Dr. Sarah Johnson' or 'Michael Chen'"
                      />
                      
                      {/* Name Icon */}
                      <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                        <div className="w-8 h-8 bg-[#ae796a]/20 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#ae796a]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#ae796a]/5 to-[#b2aeab]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    
                    {errors.name && (
                      <div className="flex items-center space-x-2 text-red-400 animate-shake">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <p className="font-semibold">{errors.name.message}</p>
                      </div>
                    )}
                  </div>

                  {/* Manifesto Section */}
                  <div className="bg-gradient-to-r from-[#102842]/20 to-[#2a4669]/20 rounded-3xl p-8 border border-[#ae796a]/10">
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#30424b] to-[#102842] rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                        3
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Candidate Manifesto</h3>
                        <p className="text-[#b2aeab] mt-1">Define the vision, goals, and promises</p>
                      </div>
                    </div>

                    <div className="relative group">
                      <textarea
                        {...register('manifesto')}
                        rows="6"
                        className="w-full bg-white/5 border-2 border-[#b2aeab]/30 focus:border-[#ae796a] focus:bg-white/10 px-6 py-5 rounded-2xl text-white text-lg font-medium placeholder-[#b2aeab]/60 transition-all duration-300 hover:border-[#ae796a]/60 group-hover:shadow-lg backdrop-blur-sm resize-none"
                        placeholder="Outline the candidate's platform, key policies, experience, and vision for change. What makes them the right choice for voters?"
                      />
                      
                      {/* Manifesto Icon */}
                      <div className="absolute top-5 right-6 pointer-events-none">
                        <div className="w-8 h-8 bg-[#ae796a]/20 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#ae796a]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#ae796a]/5 to-[#b2aeab]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>

                    <div className="mt-6 bg-[#ae796a]/10 rounded-2xl p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-[#ae796a]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-[#ae796a]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-[#b2aeab] text-sm leading-relaxed">
                          <strong className="text-white">Pro Tip:</strong> Include specific policy positions, past achievements, and clear commitments. Voters appreciate transparency and concrete plans.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Section */}
                  <div className="pt-8">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full px-8 py-6 bg-gradient-to-r from-[#ae796a] via-[#b2aeab] to-[#ae796a] hover:from-[#b2aeab] hover:via-[#ae796a] hover:to-[#b2aeab] text-white font-bold text-xl tracking-wide rounded-2xl shadow-2xl hover:shadow-[#ae796a]/25 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ease-out overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {/* Animated background overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out"></div>
                      
                      {/* Button content */}
                      <div className="relative flex items-center justify-center space-x-4">
                        {isSubmitting ? (
                          <>
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span className="text-lg font-bold">Adding Candidate...</span>
                          </>
                        ) : (
                          <>
                            <svg 
                              className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                            </svg>
                            <span className="text-lg font-bold">Register Candidate for Democracy</span>
                            <svg 
                              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </>
                        )}
                      </div>

                      {/* Bottom accent line */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-3/4 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent transition-all duration-500 ease-out rounded-full"></div>
                    </button>
                  </div>

                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-5deg); }
        }
        
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-80px) scale(1.3) rotate(180deg); opacity: 0.9; }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes slide-down {
          from { transform: translate(-50%, -100%); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-gradient-x { animation: gradient-x 4s ease infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-slide-down { animation: slide-down 0.5s ease-out; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .rounded-4xl { border-radius: 2rem; }
      `}</style>
    </div>
  )
}