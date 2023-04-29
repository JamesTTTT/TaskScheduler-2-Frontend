import React, { useState } from "react";
import { Header } from ".";
const Layout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    console.log(!isDarkMode);
  };

  return (
    <div
      className={`h-full min-h-screen  ${
        isDarkMode
          ? "bg-dark-base text-dark-primary"
          : "bg-light-base text-light-neutral"
      }`}
    >
      <button
        onClick={toggleDarkMode}
        className="bg-blue-500 text-white px-4 py-2 rounded absolute right-0 bottom-0"
      >
        Toggle Dark Mode
      </button>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
