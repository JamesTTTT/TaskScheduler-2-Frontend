import React from "react";
import { Header } from "..";
import { useTheme } from "../../context/ThemeContext";
const Layout = ({ children }) => {
  const { colourTheme, changeTheme } = useTheme();

  return (
    <div
      className={`h-full min-h-screen  ${
        colourTheme === "dark"
          ? "bg-dark-base text-dark-info"
          : "bg-light-base text-light-info"
      }`}
    >
      <div className="bg-blue-500 text-white px-4 py-2 rounded-tl-2xl absolute right-0 bottom-0">
        <button
          onClick={() => {
            changeTheme("dark");
          }}
          className="bg-blue-900 w-9 h-9 rounded-full mx-2"
        ></button>
        <button
          onClick={() => {
            changeTheme("light");
          }}
          className="bg-white w-9 h-9 rounded-full mx-2"
        ></button>
      </div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
