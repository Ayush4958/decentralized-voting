// AuthButton.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext' 
import Loader from "../defined_UI/loader"

const Login_Logout_Btn = () => {
  const { user, logout, loading } = useAuth()
  const navigate = useNavigate()

  const handleAuthAction = () => {
    if (user) {
      logout()
    } else {
      navigate('/login') 
    }
  }

  if (loading) {
    return (
      <button 
        disabled 
        className="group relative inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-bold text-white overflow-hidden rounded-2xl shadow-2xl cursor-not-allowed min-w-[100px] sm:min-w-[120px] border backdrop-blur-sm"
        style={{
          background: 'linear-gradient(135deg, #5E503F 0%, #22333B 50%, #0A0908 100%)',
          borderColor: '#5E503F50'
        }}
      >
        <div className="absolute inset-0 animate-pulse" style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(234, 224, 213, 0.2) 50%, transparent 100%)'
        }}></div>
        <div className="absolute inset-0 opacity-30" style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(234, 224, 213, 0.1), transparent)'
        }}></div>
        <div className="relative z-10">
          <Loader />
        </div>
      </button>
    )
  }

  return (
    <button 
      onClick={handleAuthAction}
      className="group relative inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-bold text-white overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-110 hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-transparent active:scale-95 min-w-[100px] sm:min-w-[120px] backdrop-blur-sm border"
      style={{
        background: user 
          ? 'linear-gradient(135deg, #C6AC8E 0%, #5E503F 50%, #22333B 100%)' 
          : 'linear-gradient(135deg, #EAE0D5 0%, #C6AC8E 50%, #22333B 100%)',
        borderColor: user ? '#C6AC8E50' : '#EAE0D550'
      }}
      onMouseEnter={(e) => {
        e.target.style.background = user 
          ? 'linear-gradient(135deg, #EAE0D5 0%, #C6AC8E 40%, #5E503F 100%)' 
          : 'linear-gradient(135deg, #EAE0D5 20%, #C6AC8E 60%, #5E503F 100%)'
      }}
      onMouseLeave={(e) => {
        e.target.style.background = user 
          ? 'linear-gradient(135deg, #C6AC8E 0%, #5E503F 50%, #22333B 100%)' 
          : 'linear-gradient(135deg, #EAE0D5 0%, #C6AC8E 50%, #22333B 100%)'
      }}
    >
      {/* Animated background effects */}
      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(234, 224, 213, 0.3) 50%, transparent 100%)'
      }}></div>
      <div className="absolute inset-0 opacity-30" style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(234, 224, 213, 0.2), transparent)'
      }}></div>
      
      {/* Pulse effect on hover */}
      <div className="absolute inset-0 rounded-2xl animate-pulse opacity-40 transition-opacity duration-300" style={{
        background: 'rgba(234, 224, 213, 0.3)'
      }}></div>
      
      {/* Corner highlights */}
      <div className="absolute top-0 left-0 w-6 h-6 rounded-2xl opacity-60" style={{
        background: 'linear-gradient(135deg, rgba(234, 224, 213, 0.4) 0%, transparent 100%)'
      }}></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 rounded-2xl" style={{
        background: 'linear-gradient(315deg, rgba(198, 172, 142, 0.2) 0%, transparent 100%)'
      }}></div>
      
      {/* Button text */}
      <span className="relative z-10 tracking-wide drop-shadow-sm">
        {user ? 'Logout' : 'Login'}
      </span>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300" style={{
        background: user 
          ? 'linear-gradient(90deg, #C6AC8E, #EAE0D5)' 
          : 'linear-gradient(90deg, #EAE0D5, #C6AC8E)'
      }}></div>
    </button>
  )
}

export default Login_Logout_Btn