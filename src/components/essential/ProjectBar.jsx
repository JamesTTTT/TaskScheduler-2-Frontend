import React from "react";
import { AiOutlinePlus, AiOutlineExpandAlt } from "react-icons/ai";
const ProjectBar = ({ Projects }) => {
  const ProjectsMap = () => {
    return Projects.map((item, index) => {
      return (
        <button className="p-4 rounded-full bg-slate-900 mb-2">
          <span className="text-xl">{item.slice(0, 2)}</span>
        </button>
      );
    });
  };

  return (
    <div className="flex flex-col px-2">
      <button className="p-4 rounded-full bg-slate-900 mb-2">
        <span className="text-xl">
          <AiOutlineExpandAlt />
        </span>
      </button>
      <button className="p-4 rounded-full bg-slate-900 mb-2">
        <span className="text-xl">
          <AiOutlinePlus />
        </span>
      </button>
      {Projects ? ProjectsMap() : null}
    </div>
  );
};

export default ProjectBar;
