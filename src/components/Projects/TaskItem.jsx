import React from "react";
import { useTheme } from "../../context/ThemeContext";
const TaskItem = ({ task }) => {
  const { colourTheme } = useTheme();
  console.log(colourTheme);
  return (
    <div
      className={`p-2 m-2 w-80 bg-${colourTheme}-base rounded-xl overflow-hidden break-words h-40`}
    >
      <h1 className="text-xl">{task.title}</h1>
      <p className="p-0 opacity-75 text-sm">{task.description}</p>
    </div>
  );
};

export default TaskItem;
