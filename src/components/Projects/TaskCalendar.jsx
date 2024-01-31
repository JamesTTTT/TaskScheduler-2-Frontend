import React, { useState, useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useTheme } from "../../context/ThemeContext";
const TaskCalendar = ({ tasks }) => {
  const { colourTheme } = useTheme();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const renderGrid = () => {
    const days = [];

    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();
    const totalDaysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();

    // Save for later
    const totalDaysInPreviousMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      0
    ).getDate();

    for (let i = 1; i < firstDayOfMonth; i++) {
      days.push(
        <div
          className={`border border-${colourTheme}-primary p-4 opacity-25 h-36`}
        ></div>
      );
    }

    for (let i = 1; i <= totalDaysInMonth; i++) {
      days.push(
        <div
          className={`border border-${colourTheme}-primary p-4 h-36 transition`}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  const daysOfTheWeek = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map((item, index) => {
      return (
        <div key={index} className={`border border-${colourTheme}-primary p-4`}>
          {item}
        </div>
      );
    });
  };

  const changeMonth = (offset) => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() + offset))
    );
  };

  const displayMonthAndYear = () => {
    return currentMonth.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between px-3 items-center">
        <div className="flex gap-3">
          <button className="">Day</button>
          <button className="">Week</button>
          <button className="">Month</button>
        </div>
        <div>{displayMonthAndYear()}</div>
        <div className="flex gap-3 font-semibold text-2xl p-3 bg-">
          <button className="hover:opacity-75" onClick={() => changeMonth(-1)}>
            <AiOutlineLeft />
          </button>
          <button
            className="text-lg font-thin hover:opacity-75"
            onClick={() => setCurrentMonth(new Date())}
          >
            <span>Today</span>
          </button>
          <button className="hover:opacity-75" onClick={() => changeMonth(+1)}>
            <AiOutlineRight />
          </button>
        </div>
      </div>
      <div className={`grid grid-cols-7 gap-0 bg-${colourTheme}-base2 `}>
        {daysOfTheWeek()}
      </div>
      <div className="grid grid-cols-7 gap-0">{renderGrid()}</div>
    </div>
  );
};

export default TaskCalendar;
