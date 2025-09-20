import React from 'react'
import Login_Logout_Btn from '../defined_UI/login_logout_btn'
import ErrorPage from '../defined_UI/error'
import RoleButton from '../defined_UI/role-btn'
import { useAuth } from '../context/authContext'

function Home() {
  const { user, logout, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#102842] to-[#2a4669] flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-[#ae796a]/30 border-t-[#ae796a] rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-[#b2aeab]/50 rounded-full animate-spin animate-reverse"></div>
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
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-[#ae796a]/5 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#b2aeab]/5 rounded-full blur-2xl animate-float-delayed"></div>
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#ae796a]/20 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Navigation Header */}
      <nav className="relative z-10 p-6 sm:p-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#ae796a] to-[#b2aeab] rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">VoteSecure</h2>
              <p className="text-[#b2aeab] text-sm">Democratic Excellence</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && <RoleButton />}
            <Login_Logout_Btn />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pb-20">
        
        {/* Hero Section */}
        <div className="text-center pt-16 sm:pt-24 pb-20">
          <div className="mb-8">
            <span className="inline-block px-6 py-3 bg-[#ae796a]/20 backdrop-blur-sm border border-[#ae796a]/30 rounded-full text-[#ae796a] font-semibold text-sm sm:text-base shadow-lg">
              🗳️ Secure • Transparent • Democratic
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-6 leading-none">
            Your Voice
            <span className="block bg-gradient-to-r from-[#ae796a] via-[#b2aeab] to-[#ae796a] bg-clip-text text-transparent animate-gradient-x">
              Matters
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-[#b2aeab] mb-12 max-w-4xl mx-auto leading-relaxed">
            Experience the future of democratic participation with our cutting-edge voting platform. 
            Secure, transparent, and designed to amplify every citizen's voice in the digital age.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            {!user ? (
              <button className="group relative px-8 py-4 bg-gradient-to-r from-[#ae796a] to-[#b2aeab] hover:from-[#b2aeab] hover:to-[#ae796a] text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-[#ae796a]/25 transform hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                <span className="relative flex items-center space-x-3">
                  <span>Get Started Today</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-[#ae796a] to-[#b2aeab] hover:from-[#b2aeab] hover:to-[#ae796a] text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-[#ae796a]/25 transform hover:scale-105 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                  <span className="relative flex items-center space-x-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Cast Your Vote</span>
                  </span>
                </button>
                
                <button className="group px-8 py-4 border-2 border-[#b2aeab]/50 hover:border-[#ae796a] text-white hover:bg-[#ae796a]/10 font-semibold text-lg rounded-2xl backdrop-blur-sm transition-all duration-300">
                  <span className="flex items-center space-x-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                    <span>View Results</span>
                  </span>
                </button>
              </div>
            )}
            
            <button className="group px-8 py-4 border-2 border-[#b2aeab]/50 hover:border-[#ae796a] text-white hover:bg-[#ae796a]/10 font-semibold text-lg rounded-2xl backdrop-blur-sm transition-all duration-300">
              <span className="flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Learn More</span>
              </span>
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            {
              icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ),
              title: "Secure Voting",
              description: "Military-grade encryption ensures your vote remains private and tamper-proof."
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "Real-time Results",
              description: "Watch democracy in action with live vote counting and instant result updates."
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ),
              title: "Verified Identity",
              description: "Advanced authentication ensures only eligible voters can participate."
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              ),
              title: "AI Analytics",
              description: "Intelligent insights and manifesto analysis help you make informed decisions."
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm border border-[#ae796a]/20 rounded-2xl p-8 hover:bg-white/10 hover:border-[#ae796a]/40 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#ae796a] to-[#b2aeab] rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-[#b2aeab] leading-relaxed">{feature.description}</p>
              
              <div className="absolute inset-0 bg-gradient-to-r from-[#ae796a]/5 to-[#b2aeab]/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white/5 backdrop-blur-sm border border-[#ae796a]/20 rounded-3xl p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Powering Democracy
            </h2>
            <p className="text-xl text-[#b2aeab] max-w-3xl mx-auto">
              Join thousands of citizens who trust our platform for secure, transparent voting
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "50K+", label: "Active Voters", icon: "👥" },
              { number: "1.2M+", label: "Votes Cast", icon: "🗳️" },
              { number: "99.9%", label: "Security Rate", icon: "🔒" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-6xl mb-4">{stat.icon}</div>
                <div className="text-4xl sm:text-5xl font-black text-white mb-2 group-hover:text-[#ae796a] transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-lg text-[#b2aeab] font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Welcome Section */}
        {user && (
          <div className="bg-gradient-to-r from-[#ae796a]/10 to-[#b2aeab]/10 backdrop-blur-sm border border-[#ae796a]/30 rounded-3xl p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#ae796a] to-[#b2aeab] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-black text-white">
                {user.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Welcome back, {user.email?.split('@')[0]}!
            </h2>
            <p className="text-xl text-[#b2aeab] mb-8 max-w-2xl mx-auto">
              Ready to make your voice heard? Explore active polls and cast your vote to shape the future.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-[#ae796a] to-[#b2aeab] text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                <span className="relative">View Active Polls</span>
              </button>
              <button className="px-8 py-4 border-2 border-[#b2aeab]/50 hover:border-[#ae796a] text-white hover:bg-[#ae796a]/10 font-semibold text-lg rounded-2xl backdrop-blur-sm transition-all duration-300">
                Check Results
              </button>
            </div>
          </div>
        )}

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
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-100px) scale(1.2); opacity: 0.8; }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-float-particle { animation: float-particle linear infinite; }
        .animate-gradient-x { animation: gradient-x 4s ease infinite; }
      `}</style>
    </div>
  )
}

export default Home