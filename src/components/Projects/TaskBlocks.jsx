import React from "react";
import { TaskItem, AiTask } from "..";
import { AiOutlinePlus } from "react-icons/ai";
const TaskBlocks = ({
  statusValues,
  groupedTasks,
  handleDragStart,
  handleDragOver,
  handleDrop,
  hoverOverStatus,
  recommendedTasks,
}) => {
  return (
    <>
      {statusValues.map((status) => (
        <div
          key={status}
          onDragOver={(event) => handleDragOver(event, status)}
          onDrop={(event) => handleDrop(event, status)}
        >
          <h2 className="text-lg font-thin py-2">{status}</h2>
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
        <h2 className="text-lg font-thin py-2">Phantom tasks</h2>
        <div className="flex flex-wrap">
          {recommendedTasks &&
            recommendedTasks.map((item, index) => (
              <div key={index}>
                <AiTask task={item} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default TaskBlocks;
