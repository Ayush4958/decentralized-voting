import { Navigate } from "react-router-dom"
import { useRole } from "../context/roleContext"

export default function RoleRoute({ children }) {
  const { role, loading, setRole } = useRole()

  if (loading) return <p>Loading...</p>

   if (role === "admin") {
  return <Navigate to="/admin/dashboard" replace />
}

  if (role === "student") {
  return <Navigate to="/dashboard" replace />
}

  return children
}
