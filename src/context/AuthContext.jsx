import React, { createContext, useState, useContext, useEffect } from "react";
import { login, register } from "../api/authApi";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token: null,
  });

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authToken"));
    if (authData && authData.token && Date.now() < authData.expiresAt) {
      setAuthState({
        isAuthenticated: true,
        token: authData.token,
      });
    } else {
      handleLogout(); // Log out the user if the token is expired or not found
    }
  }, []);

  const handleLogin = async (email, password) => {
    const result = await login(email, password);
    if (result.success) {
      const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // Add 24 hours to the current time
      const authData = {
        token: result.data.token,
        expiresAt: expirationTime,
      };
      localStorage.setItem("authToken", JSON.stringify(authData));
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
