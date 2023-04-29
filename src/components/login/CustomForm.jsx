import React from "react";

const CustomForm = ({ fields, onSubmit, onChange, details }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-center items-center w-96 bg-dark-base p-5 rounded-xl"
    >
      <h1 className="font-bold text-xl text-dark-info ">Task Phantom</h1>
      <div className="flex flex-col justify-center items-center w-full py-7 pb-12">
        {fields.map((item, index) => {
          return (
            <input
              key={index}
              name={item.name}
              value={details[item.name]}
              placeholder={item.placeholder}
              type={item.type}
              onChange={onChange}
              className="p-3 rounded-xl bg-dark-base border border-dark-info text-dark-info w-10/12 my-2"
            />
          );
        })}
      </div>
      <button className=" font-bold text-dark-info bg-dark-neutral rounded-xl py-3 px-6">
        Submit
      </button>
    </form>
  );
};

export default CustomForm;
