import { Navigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import Loader from '../defined_UI/loader'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <Loader />

  if (!user) return <Navigate to="/login" replace />

  return children
}
