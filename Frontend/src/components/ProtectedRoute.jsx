import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-sm">
        Loading...
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (adminOnly && user.role !== "ROLE_ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
export default ProtectedRoute;