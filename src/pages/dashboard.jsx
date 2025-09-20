import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useState } from "react";

export default function Dashboard() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #102842 0%, #2a4669 30%, #30424b 70%, #b2aeab 100%)'
    }}>
      {/* Floating particles background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full opacity-30 animate-pulse" style={{backgroundColor: '#ae796a'}}></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 rounded-full opacity-40 animate-bounce" style={{backgroundColor: '#30424b'}}></div>
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 rounded-full opacity-20 animate-pulse" style={{backgroundColor: '#b2aeab'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full opacity-50 animate-ping" style={{backgroundColor: '#ae796a'}}></div>
      </div>

      {/* Mobile Menu Button */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 p-3 rounded-2xl backdrop-blur-md shadow-lg sm:hidden transition-all duration-300 hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, rgba(178, 174, 171, 0.9) 0%, rgba(174, 121, 106, 0.8) 100%)',
          color: '#102842'
        }}
      >
        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
          <div className={`w-full h-0.5 transition-all duration-300 ${sidebarOpen ? 'rotate-45 translate-y-1.5' : ''}`} style={{backgroundColor: '#102842'}}></div>
          <div className={`w-full h-0.5 transition-all duration-300 ${sidebarOpen ? 'opacity-0' : ''}`} style={{backgroundColor: '#102842'}}></div>
          <div className={`w-full h-0.5 transition-all duration-300 ${sidebarOpen ? '-rotate-45 -translate-y-1.5' : ''}`} style={{backgroundColor: '#102842'}}></div>
        </div>
      </button>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-72 p-6 space-y-6 relative backdrop-blur-sm border-r border-opacity-20 transition-transform duration-300 z-40 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } sm:translate-x-0 fixed sm:relative h-full`}
        style={{
          background: 'linear-gradient(180deg, rgba(16, 40, 66, 0.95) 0%, rgba(42, 70, 105, 0.85) 100%)',
          borderColor: '#ae796a'
        }}
      >
        {/* Sidebar glow effect */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          background: 'radial-gradient(circle at 30% 40%, rgba(174, 121, 106, 0.1), transparent)'
        }}></div>
        
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2 tracking-wide" style={{color: '#b2aeab'}}>
            Student Panel
          </h2>
          <div className="w-12 h-1 rounded-full mb-4" style={{backgroundColor: '#ae796a'}}></div>
        </div>
        
        <nav className="space-y-4 relative z-10">
          <Link to="/vote" 
            className="group flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-opacity-30"
            style={{
              color: '#b2aeab',
              background: 'linear-gradient(135deg, rgba(48, 66, 75, 0.3), rgba(174, 121, 106, 0.1))',
              borderColor: '#30424b'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, rgba(174, 121, 106, 0.4), rgba(178, 174, 171, 0.1))';
              e.target.style.transform = 'translateX(8px) scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, rgba(48, 66, 75, 0.3), rgba(174, 121, 106, 0.1))';
              e.target.style.transform = 'translateX(0) scale(1)';
            }}
          >
            <span className="text-xl">🗳️</span>
            <span className="font-medium">Vote</span>
          </Link>
          
          <Link to="/vote-results" 
            className="group flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-opacity-30"
            style={{
              color: '#b2aeab',
              background: 'linear-gradient(135deg, rgba(48, 66, 75, 0.3), rgba(174, 121, 106, 0.1))',
              borderColor: '#30424b'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, rgba(174, 121, 106, 0.4), rgba(178, 174, 171, 0.1))';
              e.target.style.transform = 'translateX(8px) scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, rgba(48, 66, 75, 0.3), rgba(174, 121, 106, 0.1))';
              e.target.style.transform = 'translateX(0) scale(1)';
            }}
          >
            <span className="text-xl">📊</span>
            <span className="font-medium">View Results</span>
          </Link>
          
          <Link to="/vote-results" 
            className="group flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-opacity-30"
            style={{
              color: '#b2aeab',
              background: 'linear-gradient(135deg, rgba(48, 66, 75, 0.3), rgba(174, 121, 106, 0.1))',
              borderColor: '#30424b'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, rgba(174, 121, 106, 0.4), rgba(178, 174, 171, 0.1))';
              e.target.style.transform = 'translateX(8px) scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, rgba(48, 66, 75, 0.3), rgba(174, 121, 106, 0.1))';
              e.target.style.transform = 'translateX(0) scale(1)';
            }}
          >
            <span className="text-xl">🤖</span>
            <span className="font-medium">AI Summary</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 relative z-10">
        {/* Header */}
        <div className="backdrop-blur-md p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 border border-opacity-20 relative overflow-hidden mt-16 sm:mt-0"
          style={{
            background: 'linear-gradient(135deg, rgba(178, 174, 171, 0.95) 0%, rgba(174, 121, 106, 0.85) 100%)',
            borderColor: '#ae796a'
          }}
        >
          {/* Header glow effect */}
          <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
            background: 'radial-gradient(circle at 70% 30%, rgba(48, 66, 75, 0.1), transparent)'
          }}></div>
          
          <div className="relative z-10">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2" style={{color: '#102842'}}>
              Welcome, Student
            </h1>
            <div className="w-16 sm:w-20 h-1 rounded-full" style={{backgroundColor: '#30424b'}}></div>
          </div>
          <div className="mt-4 sm:mt-0 relative z-10">
            <p className="text-xs sm:text-sm lg:text-base px-3 sm:px-4 py-2 rounded-full backdrop-blur-sm" 
              style={{
                color: '#102842',
                background: 'rgba(48, 66, 75, 0.2)'
              }}
            >
              {user?.email}
            </p>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Vote Card */}
          <Link to="/vote" 
            className="group backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-opacity-20 relative overflow-hidden transition-all duration-500 hover:scale-105 cursor-pointer block"
            style={{
              background: 'linear-gradient(135deg, rgba(178, 174, 171, 0.9) 0%, rgba(174, 121, 106, 0.7) 100%)',
              borderColor: '#ae796a'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(48, 66, 75, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.1)';
            }}
          >
            {/* Card glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(48, 66, 75, 0.3), transparent)'
            }}></div>
            
            {/* Left border accent - Blue theme for voting */}
            <div className="absolute left-0 top-0 w-1 sm:w-2 h-full rounded-l-2xl sm:rounded-l-3xl" style={{backgroundColor: '#2a4669'}}></div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold pr-2 sm:pr-4" style={{color: '#102842'}}>
                  🗳️ Cast Your Vote
                </h3>
                <div className="flex-shrink-0 w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-pulse" style={{backgroundColor: '#2a4669'}}></div>
              </div>
              
              <p className="text-sm lg:text-base leading-relaxed" style={{color: '#2a4669'}}>
                Participate in active polls and make your voice heard.
              </p>
            </div>
          </Link>

          {/* Results Card */}
          <Link to="/vote-results" 
            className="group backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-opacity-20 relative overflow-hidden transition-all duration-500 hover:scale-105 cursor-pointer block"
            style={{
              background: 'linear-gradient(135deg, rgba(178, 174, 171, 0.9) 0%, rgba(174, 121, 106, 0.7) 100%)',
              borderColor: '#ae796a'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(48, 66, 75, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.1)';
            }}
          >
            {/* Card glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(48, 66, 75, 0.3), transparent)'
            }}></div>
            
            {/* Left border accent - Teal theme for results */}
            <div className="absolute left-0 top-0 w-1 sm:w-2 h-full rounded-l-2xl sm:rounded-l-3xl" style={{backgroundColor: '#30424b'}}></div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold pr-2 sm:pr-4" style={{color: '#102842'}}>
                  📊 View Results
                </h3>
                <div className="flex-shrink-0 w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-pulse" style={{backgroundColor: '#30424b'}}></div>
              </div>
              
              <p className="text-sm lg:text-base leading-relaxed" style={{color: '#2a4669'}}>
                See live voting results and track poll progress.
              </p>
            </div>
          </Link>

          {/* AI Summary Card */}
          <Link to="/vote-results" 
            className="group backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-opacity-20 relative overflow-hidden transition-all duration-500 hover:scale-105 cursor-pointer block"
            style={{
              background: 'linear-gradient(135deg, rgba(178, 174, 171, 0.9) 0%, rgba(174, 121, 106, 0.7) 100%)',
              borderColor: '#ae796a'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(48, 66, 75, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.1)';
            }}
          >
            {/* Card glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(48, 66, 75, 0.3), transparent)'
            }}></div>
            
            {/* Left border accent - Brown theme for AI */}
            <div className="absolute left-0 top-0 w-1 sm:w-2 h-full rounded-l-2xl sm:rounded-l-3xl" style={{backgroundColor: '#ae796a'}}></div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold pr-2 sm:pr-4" style={{color: '#102842'}}>
                  🤖 AI Summary
                </h3>
                <div className="flex-shrink-0 w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-pulse" style={{backgroundColor: '#ae796a'}}></div>
              </div>
              
              <p className="text-sm lg:text-base leading-relaxed" style={{color: '#2a4669'}}>
                Understand voting trends and insights with AI analysis.
              </p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}