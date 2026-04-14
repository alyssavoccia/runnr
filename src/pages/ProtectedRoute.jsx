import { Navigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import LoadingScreen from "@/components/LoadingScreen";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (user === undefined) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
