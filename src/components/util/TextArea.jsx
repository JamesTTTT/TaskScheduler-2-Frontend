import React from "react";

const TextArea = ({ onChange, value, name, placeholder }) => {
  return (
    <textarea
      className="p-3 border-2 border-dark-info bg-transparent rounded-xl w-full mb-5 resize-none"
      type="textarea"
      name={name}
      pattern=".{,250}"
      rows="4"
      cols="50"
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default TextArea;
