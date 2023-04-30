import React from "react";
import { AiOutlinePlus, AiOutlineExpandAlt } from "react-icons/ai";
const ProjectBar = ({ Projects, openCreate }) => {
  const ProjectsMap = () => {
    return Projects.map((item, index) => {
      return (
        <button className="h-14 w-14 flex justify-center items-center rounded-full bg-dark-neutral mb-2">
          <span className="text-xl">{item.title.slice(0, 2)}</span>
        </button>
      );
    });
  };

  return (
    <div className="flex flex-col px-2">
      <button className="h-14 w-14 flex justify-center items-center rounded-full bg-slate-900 mb-2">
        <span className="text-xl">
          <AiOutlineExpandAlt />
        </span>
      </button>
      <button
        onClick={openCreate}
        className=" h-14 w-14 flex justify-center items-center rounded-full bg-slate-900 mb-2"
      >
        <span className="text-xl">
          <AiOutlinePlus />
        </span>
      </button>
      {Projects ? ProjectsMap() : null}
    </div>
  );
};

export default ProjectBar;
