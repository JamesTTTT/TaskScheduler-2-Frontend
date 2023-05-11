import React from "react";
import { BsFillGrid3X3GapFill, BsList } from "react-icons/bs";
import { TaskItem } from "..";
import { useTheme } from "../../context/ThemeContext";

const TaskViewSettings = () => {
  const { colourTheme } = useTheme();

  return (
    <div
      className={`w-full flex justify-between bg-${colourTheme}-base2 rounded-t-xl mb-2`}
    >
      <div className="flex h-14 px-3">
        <button className="mx-2 text-xl">
          <BsFillGrid3X3GapFill />
        </button>
        <button className="mx-2 text-2xl">
          <BsList />
        </button>
      </div>
    </div>
  );
};

const TaskView = ({ tasks }) => {
  const { colourTheme } = useTheme();
  return (
    <div className={`bg-${colourTheme}-neutral w-full h-96 rounded-xl`}>
      {!tasks ? (
        <div className="text-2xl flex justify-center items-center h-full">
          <h1>You must select a project</h1>
        </div>
      ) : tasks.length > 0 ? (
        <div>
          <TaskViewSettings />
          <div className="px-2">
            {tasks.map((item, index) => {
              return (
                <div key={index}>
                  <TaskItem task={item} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-2xl flex justify-center items-center h-full">
          <h1>There are currently no tasks for the project</h1>
        </div>
      )}
    </div>
  );
};

export default TaskView;
