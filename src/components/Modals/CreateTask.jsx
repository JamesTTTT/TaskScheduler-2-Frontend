import React from "react";
import { motion } from "framer-motion";
import { backdropVariants, modalVariants } from "../../framer/framerAnimations";
import {
  TextInput,
  TextArea,
  DropDown,
  Calendar,
  ButtonCustom,
  TimeInput,
} from "..";

const statusValues = ["Not Started", "Working On", "In Review", "Completed"];
const recurrence = ["None", "Daily", "Weekly", "Monthly"];

const CreateTask = ({
  showModal,
  closeModal,
  onSubmit,
  taskValues,
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
            className="bg-dark-base2 p-6 rounded-lg w-128"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Create a Task</h2>
            <form onSubmit={onSubmit}>
              <TextInput
                name="title"
                placeholder={"Give your task a name"}
                value={taskValues.title}
                onChange={onChange}
              />
              <TextArea
                name="description"
                placeholder={"Describe the task..."}
                value={taskValues.description}
                onChange={onChange}
              />
              <DropDown
                value={taskValues.status}
                onChange={onChange}
                name="status"
                options={statusValues}
                defualt={"Select status"}
              />
              <DropDown
                value={taskValues.recurrence}
                onChange={onChange}
                name="recurrence"
                options={recurrence}
                defualt={"Select recurrence"}
              />
              <Calendar
                label={"Due date (Optional)"}
                onChange={onChange}
                value={taskValues.dueDate}
              />
              <TimeInput />
              <div className="flex justify-between w-40">
                <ButtonCustom type="button" label="Close" transparent={true} />
                <ButtonCustom type="submit" label="Create" />
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default CreateTask;
