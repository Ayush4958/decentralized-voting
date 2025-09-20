import { useForm } from 'react-hook-form'
import { supabase } from '../api/supabaseClient'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Poll() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm()

  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [role, setRole] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Watch form fields for dynamic validation
  const watchedFields = watch()

  // ✅ Form submit handler
  const onSubmit = async (formData) => {
    setIsSubmitting(true)
    setErrorMsg('')
    setSuccessMsg('')

    const { title, desc, start_time, end_time } = formData

    const { error } = await supabase.from('polls').insert([
      {
        title,
        desc,
        start_time,
        end_time
      }
    ])

    if (error) {
      setErrorMsg(error.message)
      console.error(error)
    } else {
      setSuccessMsg('Poll created successfully!')
      reset()
      
      // Auto navigate after 2 seconds
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
    
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#102842] via-[#2a4669] to-[#30424b] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#ae796a]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#b2aeab]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-[#ae796a]/5 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#b2aeab]/5 rounded-full blur-2xl animate-float-delayed"></div>
        
        {/* Floating Form Elements */}
        {[...Array(12)].map((_, i) => (
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
            {i % 4 === 0 && <div className="w-3 h-3 bg-[#ae796a] rounded-full"></div>}
            {i % 4 === 1 && <div className="w-4 h-4 bg-[#b2aeab] rounded-sm rotate-45"></div>}
            {i % 4 === 2 && <div className="w-2 h-6 bg-[#ae796a] rounded-full"></div>}
            {i % 4 === 3 && <div className="w-5 h-2 bg-[#b2aeab] rounded-full"></div>}
          </div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#ae796a] to-[#b2aeab] rounded-3xl shadow-2xl mb-8 animate-bounce-slow">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Create Your
              <span className="block bg-gradient-to-r from-[#ae796a] via-[#b2aeab] to-[#ae796a] bg-clip-text text-transparent animate-gradient-x">
                Democracy
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-[#b2aeab] max-w-3xl mx-auto leading-relaxed">
              Design the future of civic engagement. Craft compelling polls that give every voice the power to shape tomorrow.
            </p>
            
            <div className="mt-8 flex items-center justify-center space-x-2">
              <div className="flex space-x-1">
                {[1,2,3,4].map((step) => (
                  <div key={step} className="w-3 h-3 rounded-full bg-[#ae796a]/30">
                    <div className="w-full h-full rounded-full bg-[#ae796a] animate-pulse"></div>
                  </div>
                ))}
              </div>
              <span className="text-[#b2aeab] text-sm font-medium ml-3">4 Simple Steps</span>
            </div>
          </div>

          {/* Main Form Container */}
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
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Poll Builder</h2>
                    <p className="text-[#b2aeab] text-lg">Shape democracy, one question at a time</p>
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
                
                {/* Title Field */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#ae796a] to-[#b2aeab] rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                      1
                    </div>
                    <div>
                      <label className="text-2xl font-bold text-white block">Poll Title</label>
                      <p className="text-[#b2aeab] mt-1">Create a compelling headline that captures attention</p>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <input
                      {...register('title', { required: 'Title is required' })}
                      className="w-full bg-white/5 border-2 border-[#b2aeab]/30 focus:border-[#ae796a] focus:bg-white/10 px-6 py-5 rounded-2xl text-white text-lg font-medium placeholder-[#b2aeab]/60 transition-all duration-300 hover:border-[#ae796a]/60 group-hover:shadow-lg backdrop-blur-sm"
                      placeholder="e.g., 'Presidential Election 2024' or 'Best Pizza Topping'"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#ae796a]/5 to-[#b2aeab]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  
                  {errors.title && (
                    <div className="flex items-center space-x-2 text-red-400 animate-shake">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <p className="font-semibold">{errors.title.message}</p>
                    </div>
                  )}
                </div>

                {/* Description Field */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#2a4669] to-[#30424b] rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                      2
                    </div>
                    <div>
                      <label className="text-2xl font-bold text-white block">Description</label>
                      <p className="text-[#b2aeab] mt-1">Provide context and details about your poll</p>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <textarea
                      {...register('desc')}
                      rows="4"
                      className="w-full bg-white/5 border-2 border-[#b2aeab]/30 focus:border-[#ae796a] focus:bg-white/10 px-6 py-5 rounded-2xl text-white text-lg font-medium placeholder-[#b2aeab]/60 transition-all duration-300 hover:border-[#ae796a]/60 group-hover:shadow-lg backdrop-blur-sm resize-none"
                      placeholder="Explain the purpose, stakes, and importance of this poll. What are voters deciding on?"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#ae796a]/5 to-[#b2aeab]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Timing Section */}
                <div className="bg-gradient-to-r from-[#102842]/20 to-[#2a4669]/20 rounded-3xl p-8 border border-[#ae796a]/10">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#30424b] to-[#102842] rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                      3
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Schedule Your Poll</h3>
                      <p className="text-[#b2aeab] mt-1">Set the democratic timeline</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Start Time */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <label className="text-xl font-bold text-white">Start Time</label>
                      </div>
                      
                      <div className="relative group">
                        <input
                          type="datetime-local"
                          {...register('start_time', { required: 'Start time is required' })}
                          className="w-full bg-white/5 border-2 border-[#b2aeab]/30 focus:border-green-500 focus:bg-white/10 px-6 py-5 rounded-2xl text-white text-lg font-medium transition-all duration-300 hover:border-green-500/60 backdrop-blur-sm"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                      
                      {errors.start_time && (
                        <div className="flex items-center space-x-2 text-red-400 animate-shake">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <p className="font-semibold">{errors.start_time.message}</p>
                        </div>
                      )}
                    </div>

                    {/* End Time */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-11.707l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 6.586V3a1 1 0 112 0v3.586l1.293-1.293a1 1 0 011.414 1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <label className="text-xl font-bold text-white">End Time</label>
                      </div>
                      
                      <div className="relative group">
                        <input
                          type="datetime-local"
                          {...register('end_time', { required: 'End time is required' })}
                          className="w-full bg-white/5 border-2 border-[#b2aeab]/30 focus:border-red-500 focus:bg-white/10 px-6 py-5 rounded-2xl text-white text-lg font-medium transition-all duration-300 hover:border-red-500/60 backdrop-blur-sm"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                      
                      {errors.end_time && (
                        <div className="flex items-center space-x-2 text-red-400 animate-shake">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <p className="font-semibold">{errors.end_time.message}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Section */}
                <div className="space-y-6 pt-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#ae796a] to-[#102842] rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                      4
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Launch Democracy</h3>
                      <p className="text-[#b2aeab] mt-1">Ready to make history?</p>
                    </div>
                  </div>

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
                          <span className="text-lg font-bold">Creating Poll...</span>
                        </>
                      ) : (
                        <>
                          <svg 
                            className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                          </svg>
                          <span className="text-lg font-bold">Create Poll & Launch Democracy</span>
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
          50% { transform: translateY(-50px) scale(1.2) rotate(180deg); opacity: 0.8; }
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