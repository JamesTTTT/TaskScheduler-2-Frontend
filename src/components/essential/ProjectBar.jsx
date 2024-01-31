import React from "react";
import {
  AiOutlinePlus,
  AiOutlineExpandAlt,
  AiTwotoneCalendar,
} from "react-icons/ai";
import { useTheme } from "../../context/ThemeContext";
const ProjectBar = ({
  projects,
  openCreate,
  onSelectProject,
  selectedProject,
  setSidebarShow,
  openCalendar,
  showCalender,
}) => {
  const { colourTheme } = useTheme();
  const ProjectsMap = () => {
    return projects.map((item, index) => {
      return (
        <button
          key={index}
          onClick={() => onSelectProject(item)}
          className={`h-14 w-14 flex justify-center items-center rounded-full bg-${colourTheme}-neutral 
           mb-2 ${
             selectedProject.title === item.title
               ? "outline outline-1 outline-dark-primary"
               : ""
           }`}
        >
          <span className="text-xl">{item.title.slice(0, 2)}</span>
        </button>
      );
    });
  };

  return (
    <div className={`flex flex-col px-2 text-${colourTheme}-info`}>
      <button
        onClick={setSidebarShow}
        className={`h-14 w-14 flex justify-center items-center rounded-full bg-${colourTheme}-base2 mb-2`}
      >
        <span className="text-xl">
          <AiOutlineExpandAlt />
        </span>
      </button>
      <button
        onClick={openCreate}
        className={`h-14 w-14 flex justify-center items-center rounded-full bg-${colourTheme}-base2 mb-2`}
      >
        <span className="text-xl">
          <AiOutlinePlus />
        </span>
      </button>
      <button
        onClick={openCalendar}
        className={`h-14 w-14 flex justify-center items-center rounded-full bg-${colourTheme}-base2 mb-2 ${
          showCalender ? "outline outline-1 outline-dark-primary" : ""
        }`}
      >
        <span className="text-xl">
          <AiTwotoneCalendar />
        </span>
      </button>
      {projects ? ProjectsMap() : null}
    </div>
  );
};

export default ProjectBar;
