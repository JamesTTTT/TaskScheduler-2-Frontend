import React from "react";

const TextInput = ({ onChange, value, name, placeholder }) => {
  return (
    <input
      className="p-3 border-2 border-dark-info bg-transparent rounded-xl w-full mb-5 "
      pattern=".{3,}"
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default TextInput;
