import React, { useState } from "react";
import { BsFillGrid3X3GapFill, BsList } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { TaskItem, AiTask } from "..";
import { useTheme } from "../../context/ThemeContext";
import { updateTask } from "../../api/taskApi";
import { useAuth } from "../../context/AuthContext";
import { useProject } from "../../context/ProjectContext";
const TaskViewSettings = ({ setShowCreateTask }) => {
  const { colourTheme } = useTheme();
  const { selectedProject } = useProject();

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
      <div className="w-full flex justify-end">
        {selectedProject._id == null ? (
          <h1 className="py-3 px-4  rounded-2xl m-3">selected project first</h1>
        ) : (
          <button
            onClick={() => {
              setShowCreateTask(true);
            }}
            className="py-2 px-3 bg-slate-800 rounded-2xl m-3 hover:bg-slate-900 transition-colors"
          >
            Add New Task
          </button>
        )}
      </div>
    </div>
  );
};

const TaskView = ({
  tasks,
  updateTaskStatus,
  recommendedTasks,
  setShowCreateTask,
}) => {
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
    const updatedTasks = tasks.map((task) => {
      if (task._id === draggedTaskId) {
        updatedTask = { ...task, status: targetStatus };
        return updatedTask;
      }
      return task;
    });

    updateTaskStatus(updatedTasks);
    if (updatedTask !== null) {
      updateTask(updatedTask, token);
    }
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
          <TaskViewSettings setShowCreateTask={setShowCreateTask} />
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
                      <AiTask task={item} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-2xl flex justify-center items-center h-full flex-col">
          <TaskViewSettings setShowCreateTask={setShowCreateTask} />
          <h1>There are currently no tasks for the project</h1>
        </div>
      )}
    </div>
  );
};

export default TaskView;
