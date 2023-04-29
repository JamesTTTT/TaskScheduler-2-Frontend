import React, { useState } from "react";
import { CustomForm } from "../components";
import { useAuth } from "../context/AuthContext";
import { authData } from "../data/authData";
const Login = () => {
  const { login, register } = useAuth();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [registerDetails, setRegisterDetails] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const [mode, setMode] = useState("Login");

  return (
    <div className="bg-dark-neutral h-screen flex justify-center items-center">
      {mode === "Login" ? (
        <CustomForm
          mode={mode}
          setMode={setMode}
          fields={authData.Loginfields}
          onSubmit={async (e) => {
            e.preventDefault();
            const result = await login(
              loginDetails.email,
              loginDetails.password
            );
            if (result.success) {
              console.log("Login successful");
              // Handle successful login
            } else {
              console.error("Login failed:", result.error);
              // Handle failed login
            }
          }}
          details={loginDetails}
          onChange={(e) => {
            setLoginDetails({
              ...loginDetails,
              [e.target.name]: e.target.value,
            });
          }}
        />
      ) : (
        <CustomForm
          mode={mode}
          setMode={setMode}
          fields={authData.RegisterField}
          onSubmit={async (e) => {
            e.preventDefault();
            const result = await register(
              registerDetails.fullName,
              registerDetails.email,
              registerDetails.password
            );
            if (result.success) {
              console.log("Register successful");
              const result = await login(
                registerDetails.email,
                registerDetails.password
              );
              console.log(result);
            } else {
              console.error("Register failed:", result.error);
              // Handle failed register
            }
          }}
          details={registerDetails}
          onChange={(e) => {
            setRegisterDetails({
              ...registerDetails,
              [e.target.name]: e.target.value,
            });
          }}
        />
      )}
    </div>
  );
};

export default Login;
