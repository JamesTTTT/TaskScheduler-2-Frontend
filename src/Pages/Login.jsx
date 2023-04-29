import React, { useState } from "react";
import { CustomForm } from "../components";
import { login, register } from "../api/authApi";
const Login = () => {
  const Loginfields = [
    {
      name: "email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Enter your Password",
    },
  ];
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  return (
    <div className="bg-dark-neutral h-screen flex justify-center items-center">
      <CustomForm
        fields={Loginfields}
        onSubmit={(e) => {
          e.preventDefault();
          login(loginDetails.email, loginDetails.password);
        }}
        details={loginDetails}
        onChange={(e) => {
          setLoginDetails({
            ...loginDetails,
            [e.target.name]: e.target.value,
          });
        }}
      />
    </div>
  );
};

export default Login;
