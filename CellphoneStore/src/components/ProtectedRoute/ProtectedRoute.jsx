import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthenticationContext } from "../Services/Auth/auth.context";

// Protege una ruta: exige sesión y, opcionalmente, un rol permitido.
export const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, user } = useContext(AuthenticationContext);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user?.role))
    return <Navigate to="/home" replace />;

  return children;
};

export default ProtectedRoute;
