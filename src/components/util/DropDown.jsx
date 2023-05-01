import React from "react";

const DropDown = ({ options, defualt, onChange, value, name }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      name={name}
      className="w-full p-3 border-2 bg-transparent rounded-xl mb-5 border-dark-info"
    >
      <option disabled>{defualt}</option>
      {options.map((item, index) => {
        return (
          <option key={index} value={item}>
            {item}
          </option>
        );
      })}
    </select>
  );
};

export default DropDown;
