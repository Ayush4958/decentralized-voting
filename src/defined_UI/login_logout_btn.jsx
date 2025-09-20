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
          background: 'linear-gradient(135deg, #4A5568 0%, #2D3748 50%, #1A202C 100%)',
          borderColor: '#4A556850'
        }}
      >
        <div className="absolute inset-0 animate-pulse" style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 182, 193, 0.2) 50%, transparent 100%)'
        }}></div>
        <div className="absolute inset-0 opacity-30" style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 182, 193, 0.1), transparent)'
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
          ? 'linear-gradient(135deg, #FF7F7F 0%, #FF6B9D 50%, #4A5568 100%)' 
          : 'linear-gradient(135deg, #FFB6C1 0%, #FFA07A 50%, #4682B4 100%)',
        borderColor: user ? '#FF7F7F50' : '#FFB6C150'
      }}
      onMouseEnter={(e) => {
        e.target.style.background = user 
          ? 'linear-gradient(135deg, #FFB6C1 0%, #FF7F7F 40%, #FF6B9D 100%)' 
          : 'linear-gradient(135deg, #FFB6C1 20%, #FFA07A 60%, #87CEEB 100%)'
      }}
      onMouseLeave={(e) => {
        e.target.style.background = user 
          ? 'linear-gradient(135deg, #FF7F7F 0%, #FF6B9D 50%, #4A5568 100%)' 
          : 'linear-gradient(135deg, #FFB6C1 0%, #FFA07A 50%, #4682B4 100%)'
      }}
    >
      {/* Animated background effects */}
      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 182, 193, 0.4) 50%, transparent 100%)'
      }}></div>
      <div className="absolute inset-0 opacity-30" style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(255, 160, 122, 0.2), transparent)'
      }}></div>
      
      {/* Pulse effect on hover */}
      <div className="absolute inset-0 rounded-2xl animate-pulse opacity-40 transition-opacity duration-300" style={{
        background: 'rgba(255, 182, 193, 0.3)'
      }}></div>
      
      {/* Corner highlights */}
      <div className="absolute top-0 left-0 w-6 h-6 rounded-2xl opacity-60" style={{
        background: 'linear-gradient(135deg, rgba(255, 182, 193, 0.5) 0%, transparent 100%)'
      }}></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 rounded-2xl" style={{
        background: 'linear-gradient(315deg, rgba(255, 160, 122, 0.3) 0%, transparent 100%)'
      }}></div>
      
      {/* Button text */}
      <span className="relative z-10 tracking-wide drop-shadow-sm">
        {user ? 'Logout' : 'Login'}
      </span>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300" style={{
        background: user 
          ? 'linear-gradient(90deg, #FF7F7F, #FF6B9D)' 
          : 'linear-gradient(90deg, #FFB6C1, #FFA07A)'
      }}></div>
    </button>
  )
}

export default Login_Logout_Btn