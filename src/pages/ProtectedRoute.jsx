import { Navigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { useDemo } from "@/context/DemoContext";
import LoadingScreen from "@/components/LoadingScreen";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const { isDemo } = useDemo();

  if (user === undefined) return <LoadingScreen />;
  if (!user && !isDemo) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
