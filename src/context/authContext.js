"use client";

// Autenticación quemada: no depende de Firebase ni de un backend real,
// para que el frontend pueda desplegarse de forma independiente como demo.
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("employee");
    setUser(stored ? JSON.parse(stored) : null);
    setLoading(false);
  }, []);

  const login = (employee) => {
    localStorage.setItem("firebaseToken", "mock-token");
    localStorage.setItem("employee", JSON.stringify(employee));
    setUser(employee);
  };

  const logout = () => {
    localStorage.removeItem("firebaseToken");
    localStorage.removeItem("employee");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
