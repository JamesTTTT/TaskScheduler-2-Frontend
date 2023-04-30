import React from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: { delay: 0.5 } },
};

const ProjectModal = ({
  showModal,
  closeModal,
  onSubmit,
  projectValues,
  onChange,
}) => {
  return (
    <>
      {showModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          onClick={closeModal}
        >
          <motion.div
            className="bg-dark-base p-6 rounded-lg w-128"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Create a Project</h2>
            <form onSubmit={onSubmit}>
              <input
                className="p-3 border-2 border-dark-info bg-transparent rounded-xl w-full mb-5 "
                pattern=".{3,}"
                type="text"
                name="title"
                value={projectValues.title}
                onChange={onChange}
                placeholder="Title"
              />
              <textarea
                className="p-3 border-2 border-dark-info bg-transparent rounded-xl w-full mb-5 resize-none"
                type="textarea"
                name="description"
                pattern=".{,250}"
                rows="4"
                cols="50"
                onChange={onChange}
                value={projectValues.description}
                placeholder="Description"
              />

              <button
                type="button"
                className="mt-4 border border-dark-primary text-white px-4 py-2  mr-2 rounded"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                type="submit"
                className="mt-4 bg-dark-info text-dark-base px-4 py-2 rounded border border-dark-primary"
              >
                Create
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ProjectModal;
