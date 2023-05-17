import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { AiOutlinePlus, AiOutlineSetting } from "react-icons/ai";
const AiTask = ({ task }) => {
  const { colourTheme } = useTheme();

  return (
    <div
      className={`p-2 mr-2 mb-2 w-80 bg-${colourTheme}-base rounded-xl
       overflow-hidden break-words h-40 flex flex-col justify-between cursor-pointer`}
    >
      <div>
        <h1 className="text-xl">{task.title}</h1>
        <p className="p-0 opacity-75 text-sm max-h-20 overflow-hidden text-ellipsis">
          {task.description}
        </p>
      </div>
      <div className="py-1 flex justify-end">
        <button
          className="mx-1 px-2 py-1 bg-slate-800
         hover:text-blue-300 rounded-xl"
        >
          Configure
        </button>
      </div>
    </div>
  );
};

export default AiTask;
