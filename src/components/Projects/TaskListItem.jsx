import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { AiOutlinePlus, AiOutlineSetting } from "react-icons/ai";

const TaskListItem = ({ task }) => {
  const { colourTheme } = useTheme();
  colourTheme;
  return (
    <div
      className={`p-2 mr-2 mb-2 w-full bg-${colourTheme}-base rounded-xl
         overflow-hidden break-words flex flex-row justify-between cursor-pointer`}
    >
      <div>
        <h1 className="text-xl">{task.title}</h1>
        {/* <p className="p-0 opacity-75 text-sm max-h-20 overflow-hidden text-ellipsis">
          {task.description}
        </p> */}
      </div>
      <div className="py-1 text-2xl flex justify-end">
        <button className="mx-1 hover:text-blue-300">
          <AiOutlinePlus />
        </button>
        <button className="mx-1 hover:text-blue-300">
          <AiOutlineSetting />
        </button>
      </div>
    </div>
  );
};

export default TaskListItem;
