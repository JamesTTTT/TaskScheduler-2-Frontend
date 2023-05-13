export const authData = {
  Loginfields: [
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
  ],
  RegisterField: [
    {
      name: "fullName",
      type: "text",
      regex: /^[a-zA-Z ]{2,30}$/,
      errorMsg: "Name should be between 2 to 30 characters",
      placeholder: "Enter your name",
    },
    {
      name: "email",
      type: "email",
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorMsg: "Enter a valid email",
      placeholder: "Enter your email",
    },
    {
      name: "password",
      type: "password",
      errorMsg:
        "Password should be at least 8 characters long and contain at least one number or symbol, one lowercase and one uppercase letter",
      regex: /^(?=.*[0-9!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      placeholder: "Enter your Password",
    },
  ],
};
