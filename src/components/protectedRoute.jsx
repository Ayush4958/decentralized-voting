import { AuthProvider } from '../context/authContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, role, loading } = AuthProvider()

  if (loading) return <p>Loading...</p>
  if (!user) return <Navigate to="/login" />
  if (!allowedRoles.includes(role)) return <Navigate to="/" />

  return children
}
