import { Route, Routes, Navigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import ProtectedRoute from "@/pages/ProtectedRoute";
import DashboardPage from "@/pages/DashboardPage";

const App = () => {
  const { user } = useAuth();

  const loginRedirect = user ? <Navigate to="/app" replace /> : <LoginPage />;

  return (
    <Routes>
      <Route index path="/" element={<LandingPage />} />
      <Route path="/login" element={loginRedirect} />
      <Route
        path="/app/*"
        element={
          <ProtectedRoute>
            <Routes>
              <Route index element={<DashboardPage />} />
            </Routes>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
