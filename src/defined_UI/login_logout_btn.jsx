// AuthButton.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext' // adjust path as needed

const  Login_Logout_Btn= () => {
  const { user, logout, loading } = useAuth()
  const navigate = useNavigate()

  const handleAuthAction = () => {
    if (user) {
      // User is logged in, perform logout
      logout()
    } else {
      // User is not logged in, redirect to login page
      navigate('/login') // or '/signup' based on your preference
    }
  }

  // Show loading state while checking authentication
  if (loading) {
    return (
      <button disabled className="auth-btn loading">
        Loading...
      </button>
    )
  }

  return (
    <button 
      onClick={handleAuthAction}
      className={`auth-btn ${user ? 'logout-btn' : 'login-btn'}`}
    >
      {user ? 'Logout' : 'Login'}
    </button>
  )
}

export default  Login_Logout_Btn