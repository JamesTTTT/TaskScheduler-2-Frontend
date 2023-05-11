import React from "react";
import { useTheme } from "../../context/ThemeContext";
const TaskItem = ({ task }) => {
  const { colourTheme } = useTheme();
  return (
    <div
      className={`p-2 w-80 bg-${colourTheme}-base rounded-xl overflow-hidden break-words`}
    >
      <h1 className="text-xl">{task.title}</h1>
      <p className="p-0 opacity-75">{task.description}</p>
    </div>
  );
};

export default TaskItem;
