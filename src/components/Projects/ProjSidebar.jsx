import React from "react";
import { motion } from "framer-motion";
import { AiOutlineMenu } from "react-icons/ai";
import { sidebar } from "../../framer/framerAnimations";
import { dateConverter } from "../../util/tools";
const ProjSidebar = ({ isOpen, projects, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50"
          aria-hidden="true"
          onClick={onClose}
        ></div>
      )}
      <motion.nav
        initial={false}
        animate={isOpen ? sidebar.open : sidebar.closed}
        custom={window.innerHeight}
        className={`fixed inset-y-0 left-0 flex flex-col max-w-xs w-full pt-5 pb-4 bg-dark-base2
         transform transition ease-in-out duration-200 sm:duration-700 z-50 ${
           isOpen ? "translate-x-0" : "-translate-x-full"
         }`}
      >
        <div className="absolute right-0 p-4">
          <button onClick={onClose}>
            <AiOutlineMenu className="text-2xl text-dark-info" />
          </button>
        </div>
        <h1 className="text-2xl font-bold text-dark-info p-4">Projects</h1>
        {projects.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col p-4 border-b border-dark-info
               hover:bg-dark-base cursor-pointer"
            >
              <h1 className="text-lg font-bold text-dark-info">{item.title}</h1>
              <p className="text-sm font-bold text-dark-info">
                Tasks: {item.tasks.length}
              </p>
              <p className="text-sm font-bold text-dark-info">
                Created: {dateConverter(item.createdAt)}
              </p>
            </div>
          );
        })}
      </motion.nav>
    </>
  );
};

export default ProjSidebar;
