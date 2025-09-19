import { Navigate } from "react-router-dom";
import Loader from '../defined_UI/loader'

export default function RoleRoute({ children, role, allowedRoles }) {
  if (!role) {
    return   <Loader/>
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
