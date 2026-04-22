import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);
  function logout() {
    setUser(null);
  }
  function setLoggedIn(userData) {
    setUser(userData);
  }
  return (
    <AuthContext.Provider value={{ user, loading, logout, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}