import { Navigate } from "react-router-dom";

export default function RoleRoute({ children, role, allowedRoles }) {
  if (!role) {
    return <div>Loading...</div>;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
