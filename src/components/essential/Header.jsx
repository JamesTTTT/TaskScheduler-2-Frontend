import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
const Header = () => {
  return (
    <div className="w-full h-24 p-3 flex justify-between">
      <h1 className="text-2xl font-bold">TaskPhantom.net</h1>
      <div className="text-3xl p-2 bg-dark-base2 h-fit rounded-full">
        <FaRegUserCircle />
      </div>
    </div>
  );
};

export default Header;
