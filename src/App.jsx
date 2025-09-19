import './App.css';
import { useEffect, useState } from 'react';
import Signup from './pages/signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Home from './pages/home';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Role from './pages/role'
import Poll from "./pages/poll"
import AddCandidate from './pages/AddCandidate';
import Vote from "./pages/vote"
import VoteResults from './pages/VoteResult';
import ProtectedRoute from './routes/protectroute';
import RoleRoute from './routes/roleroute';
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
            <Route
              path="/login"
              element={<Login />} />

            <Route
              path="/signup"
              element={<Signup />} />

            <Route
              path="/dashboard"
              element={
                <RoleRoute
                  role={role}
                  allowedRoles={["student"]}>
                  <Dashboard />
                </RoleRoute>} />

                <Route 
                path='/vote'
                element={
                  <RoleRoute
                  role={role}
                  allowedRoles={["student"]}>
                    <Vote />
                  </RoleRoute>
                } />

            <Route path='/admin/dashboard' element={
              <RoleRoute
                role={role}
                allowedRoles={["admin"]} >
                <AdminDashboard />
              </RoleRoute>
            } />

             <Route path='/admin/poll' element={
              <RoleRoute
                role={role}
                allowedRoles={["admin"]} >
                <Poll />
              </RoleRoute>
            } />

            <Route path='/admin/add-candidate' element={
              <RoleRoute
              role={role}
              allowedRoles={["admin"]}>
              <AddCandidate />
              </RoleRoute>
            } />


            <Route path='/role' element={
              <ProtectedRoute>
                <Role />
              </ProtectedRoute>
            } />

            <Route path='/vote-results' element={
              <ProtectedRoute>
                <VoteResults />
              </ProtectedRoute>
            } />

            <Route
              path="/"
              element={<ProtectedRoute>
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
