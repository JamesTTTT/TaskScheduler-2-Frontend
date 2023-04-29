import React, { createContext, useState, useContext, useEffect } from "react";
import { login, register } from "../api/authApi";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthState({
        isAuthenticated: true,
        token,
      });
    }
  }, []);

  const handleLogin = async (email, password) => {
    const result = await login(email, password);
    if (result.success) {
      localStorage.setItem("authToken", result.data.token);
      setAuthState({
        isAuthenticated: true,
        token: result.data.token,
      });
      return { success: true };
    } else {
      return { success: false, error: result.error };
    }
  };

  const handleRegister = async (fullName, email, password) => {
    const result = await register(fullName, email, password);
    if (result.success) {
      return { success: true };
    } else {
      return { success: false, error: result.error };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthState({
      isAuthenticated: false,
      token: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        token: authState.token,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
