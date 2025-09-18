import './App.css';
import { useEffect, useState } from 'react';
import Signup from './pages/signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom'
import { AuthProvider } from './context/authContext';
import Home from './pages/home';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Role from './pages/role'
import ProtectedRoute from './routes/protectroute';
import { RoleProvider } from './context/roleContext';
import { supabase } from './api/supabaseClient';


function App() {

  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRole = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id);

      if (error) {
        console.error(error.message);
      } else {
        console.log("Profiles data:", data);
        if (data && data.length > 0) {
          setRole(data[0].role);
        }
      }
      setLoading(false)
    }
    fetchRole()
  }, [])

  useEffect(() => {
    if (role) {
      console.log("User Role (updated):", role);
    }
  }, [role]);



  return (
    <>
      <AuthProvider>
        <RoleProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />


            <Route path='/dashboard' element={
              <ProtectedRoute >
                <Dashboard />
              </ProtectedRoute>} />


            <Route path='/admin/dashboard' element={
              <ProtectedRoute >
                <AdminDashboard />
              </ProtectedRoute>
            } />

            <Route path='/role' element={
              <ProtectedRoute>
                <Role />
              </ProtectedRoute>
            } />

            <Route path="/" element={<ProtectedRoute>
              <Home />
            </ProtectedRoute>} />

            {/* Catch-all 404 */}
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </RoleProvider>
      </AuthProvider>

    </>
  )
}

export default App
