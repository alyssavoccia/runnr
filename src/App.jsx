import { Routes, Route, Navigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { useDemo } from "@/context/DemoContext";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import AppLayout from "@/components/AppLayout";
import ProtectedRoute from "@/pages/ProtectedRoute";
import { WorkoutsProvider } from "@/context/WorkoutsContext";
import DashboardPage from "@/pages/DashboardPage";
import ImportPage from "@/pages/ImportPage";

const App = () => {
  const { user } = useAuth();
  const { isDemo } = useDemo();

  const loginRedirect = user || isDemo ? <Navigate to="/app" replace /> : <LoginPage />;

  return (
    <Routes>
      <Route index path="/" element={<LandingPage />} />
      <Route path="login" element={loginRedirect} />
      <Route
        path="/app/*"
        element={
          <ProtectedRoute>
            <WorkoutsProvider>
              <AppLayout>
                <Routes>
                  <Route index element={<DashboardPage />} />
                  <Route path="import" element={<ImportPage />} />
                </Routes>
              </AppLayout>
            </WorkoutsProvider>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
