import React from "react";

const ButtonCustom = ({ type, label, transparent = false }) => {
  return (
    <button
      type={type}
      className={`${
        transparent ? "bg-transparent text-white" : "bg-dark-info"
      } text-dark-base px-4 py-2 rounded border border-dark-primary hover:bg-opacity-75`}
    >
      {label}
    </button>
  );
};

export default ButtonCustom;
