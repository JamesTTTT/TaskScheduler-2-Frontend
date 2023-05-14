import React from "react";
import {
  AiOutlineExclamationCircle,
  AiOutlineCheckCircle,
} from "react-icons/ai";
const CustomForm = ({
  mode,
  setMode,
  fields,
  onSubmit,
  onChange,
  details,
  errors,
}) => {
  console.log(errors);
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-center text-dark-info items-center w-96 bg-dark-base2 p-5 rounded-xl"
    >
      <h1 className="font-bold text-xl text-dark-info ">Task Phantom {mode}</h1>
      <div className="flex flex-col justify-center items-center w-full pt-5 pb-6">
        {fields.map((item, index) => {
          return (
            <div
              key={index}
              className="w-full flex flex-row items-center justify-center"
            >
              <input
                name={item.name}
                value={details[item.name] || ""}
                placeholder={item.placeholder}
                type={item.type}
                onChange={onChange}
                className="p-3 rounded-xl bg-dark-base border border-dark-info text-dark-info w-10/12 my-2"
              />
              {errors === undefined ? null : errors[item.name] ? (
                <AiOutlineExclamationCircle className="text-red-500 text-2xl ml-2" />
              ) : errors[item.name] === undefined ? (
                <AiOutlineExclamationCircle className="text-gray-500 text-2xl ml-2" />
              ) : (
                <AiOutlineCheckCircle className="text-green-500 text-2xl ml-2" />
              )}
            </div>
          );
        })}
      </div>
      <button
        type="submit"
        className=" font-bold hover:bg-opacity-75 bg-dark-neutral rounded-xl py-3 px-6 mb-4"
      >
        {mode}
      </button>
      <div>
        {mode === "Login" ? (
          <p>
            No account?{" "}
            <button
              type="button"
              onClick={() => {
                setMode("Register");
              }}
              className="font-bold underline"
            >
              Register
            </button>{" "}
            free here
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setMode("Login");
              }}
              className="font-bold underline"
            >
              Login
            </button>{" "}
            here
          </p>
        )}
      </div>
    </form>
  );
};

export default CustomForm;
