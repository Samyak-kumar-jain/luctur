import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// Simple loading spinner component
const LoadingSpinner = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <div className="spinner">Loading...</div>
  </div>
);

export const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);

  // Show loading spinner while checking authentication state
  if (isLoading) return <LoadingSpinner />;

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (user?.role === "instructor") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children || <Outlet />;
};

export const Authenticated = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);

  // Show loading spinner while checking authentication state
  if (isLoading) return <LoadingSpinner />;

  if (isAuthenticated) {
    if (user.role === "instructor") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children || <Outlet />;
};

export const AdminRoute = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);

  // Show loading spinner while checking authentication state
  if (isLoading) return <LoadingSpinner />;

 

  if (!user || user.role !== "instructor") {
    return <Navigate to="/" replace />;
  }

  return children || <Outlet />;
};
