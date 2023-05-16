import React, { useState } from "react";
import { BsFillGrid3X3GapFill, BsList } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { TaskItem } from "..";
import { useTheme } from "../../context/ThemeContext";
import { updateTask } from "../../api/taskApi";
import { useAuth } from "../../context/AuthContext";
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

const TaskView = ({ tasks, updateTaskStatus, recommendedTasks }) => {
  const { colourTheme } = useTheme();
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [hoverOverStatus, setHoverOverStatus] = useState(null);
  const statusValues = ["Not Started", "Working On", "In Review", "Completed"];
  const { token } = useAuth();
  const handleDragStart = (taskId) => {
    setDraggedTaskId(taskId);
  };

  const handleDragOver = (event, status) => {
    event.preventDefault();
    if (hoverOverStatus !== status) {
      setHoverOverStatus(status);
    }
  };

  const handleDrop = (event, targetStatus) => {
    event.preventDefault();

    let updatedTask = null;

    // Update the status of the dragged task
    const updatedTasks = tasks.map((task) => {
      if (task._id === draggedTaskId) {
        console.log("id", task._id);
        updatedTask = { ...task, status: targetStatus };
        return updatedTask;
      }
      return task;
    });

    updateTaskStatus(updatedTasks);

    // If a task was updated, call the updateTask function
    if (updatedTask !== null) {
      updateTask(updatedTask, token);
    }

    // Reset the dragged task id and hover over status
    setHoverOverStatus(null);
    setDraggedTaskId(null);
  };

  const groupedTasks = tasks
    ? tasks.reduce((acc, task) => {
        const { status } = task;
        if (!acc[status]) {
          acc[status] = [];
        }
        acc[status].push(task);
        return acc;
      }, {})
    : {};

  return (
    <div className={`bg-${colourTheme}-neutral w-full h-fit pb-5 rounded-xl`}>
      {!tasks ? (
        <div className="text-2xl flex justify-center items-center h-full">
          <h1>You must select a project</h1>
        </div>
      ) : tasks.length > 0 ? (
        <div>
          <TaskViewSettings />
          <div className="px-2">
            {statusValues.map((status) => (
              <div
                key={status}
                onDragOver={(event) => handleDragOver(event, status)}
                onDrop={(event) => handleDrop(event, status)}
              >
                <h2 className="text-lg font-semibold py-2">{status}</h2>
                <div className="flex flex-wrap">
                  {groupedTasks[status] ? (
                    groupedTasks[status].map((item) => (
                      <div
                        key={item._id}
                        draggable
                        onDragStart={() => handleDragStart(item._id)}
                      >
                        <TaskItem task={item} />
                      </div>
                    ))
                  ) : (
                    <div className="w-full pb-3">
                      <p className="text-sm text-gray-500">
                        Drag and drop tasks here
                      </p>
                    </div>
                  )}
                  {hoverOverStatus === status && (
                    <div
                      className="p-2 m-2 w-80 bg-base rounded-xl overflow-hidden
                      break-words h-40 flex justify-center items-center outline-dashed outline-1 outline-dark-primary"
                    >
                      <span>
                        <AiOutlinePlus />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div>
              <h2 className="text-lg font-semibold py-2">Phantom tasks</h2>
              <div className="flex flex-wrap">
                {recommendedTasks &&
                  recommendedTasks.map((item, index) => (
                    <div key={index}>
                      <h1 className="text-xl text-white">{item.title}</h1>
                      <p className="text-xl text-white">{item.description}</p>
                      {/* <TaskItem task={item} /> */}
                    </div>
                  ))}
              </div>
            </div>
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
