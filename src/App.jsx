import './App.css';
import { useState } from 'react';
import Signup from './pages/signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom'
import { AuthProvider } from './context/authContext';
import Home from './pages/home';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import AdminDashboard from './pages/AdminDashboard';


function App() {


  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path="/" element={<Home />} />

          {/* Catch-all 404 */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </AuthProvider>

    </>
  )
}

export default App
