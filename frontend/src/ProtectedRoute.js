import { Navigate } from "react-router-dom";
import { isTokenExpired } from "./utils/_helpers";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !isTokenExpired();

  if (!isAuthenticated) {
    localStorage.removeItem("token");
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoute;
