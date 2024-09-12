import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Advertisement from "./pages/Advertisement";
import ProtectedRoute from "./ProtectedRoute";
import BaseRoute from "./BaseRoute";
import { getUser, isTokenExpired } from "./utils/_helpers";
import AdminDashboard from "./pages/AdminDashboard";

const Routing = () => {
  const isAuthenticated = !isTokenExpired();
  const { role } = getUser();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to={
              isAuthenticated && role === "User"
                ? "/user/create-advertisement"
                : "/user/admin/dashboard"
            }
          />
        }
      />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <BaseRoute />
          </ProtectedRoute>
        }
      >
        <Route path="create-advertisement" element={<Advertisement />} />
        {role !== "User" && (
          <Route path="admin/dashboard" element={<AdminDashboard />} />
        )}
      </Route>
    </Routes>
  );
};

export default Routing;
