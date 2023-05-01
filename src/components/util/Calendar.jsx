import React from "react";

const Calendar = ({ value, onChange, label }) => {
  return (
    <div>
      <label htmlFor="dueDate" className="block mb-1">
        {label}
      </label>
      <input
        type="date"
        name="dueDate"
        value={value}
        onChange={onChange}
        className="p-2 border-2 border-dark-info bg-transparent rounded-xl w-full mb-5"
      />
    </div>
  );
};

export default Calendar;
