import { Route, Routes } from "react-router";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
