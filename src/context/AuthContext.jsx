import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { signInWithPopup, signInWithRedirect, onAuthStateChanged, getRedirectResult, signOut } from "firebase/auth";
import { auth, provider } from "@/firebase";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [error, setError] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u ?? null);
      setRedirecting(false);
    });

    getRedirectResult(auth).catch((err) => {
      if (err.code !== "auth/popup-closed-by-user" && err.code !== "auth/cancelled-popup-request") {
        setError("Sign in failed. Please try again.");
        setRedirecting(false);
      }
    });

    return unsub;
  }, []);

  const login = async () => {
    setError(null);

    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error.code === "auth/popup-blocked" || error.code === "auth/operation-not-supported-in-this-environment") {
        await signInWithRedirect(auth, provider);
      } else if (error.code !== "auth/popup-closed-by-user" && error.code !== "auth/cancelled-popup-request") {
        setError("Sign in failed. Please try again.");
      }
    }
  };

  const logout = () => {
    signOut(auth);
    navigate("/");
  };

  return <AuthContext.Provider value={{ user, login, logout, error, redirecting }}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider };
