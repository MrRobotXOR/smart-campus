import { Navigate } from "react-router-dom";
import { getUser, isAuthenticated } from "../store/authStore";

function RoleRoute({ roles, children }) {

  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  const user = getUser();

  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default RoleRoute;