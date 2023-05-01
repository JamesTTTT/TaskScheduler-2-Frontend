import React, { useState } from "react";

const TimeInput = ({ onChange }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const convertToMinutes = (hours, minutes) => {
    return hours * 60 + minutes;
  };

  const onHourChange = (e) => {
    onChange(e.target.value, minutes);
  };

  const onMinuteChange = () => {
    onChange({});
  };

  return (
    <div>
      <label className="block mb-1">Estimated hours (Optional)</label>
      <div className="flex mb-5">
        <input
          className="bg-transparent border-2 border-dark-info rounded-xl p-2 mr-2"
          type="number"
          min="0"
          value={hours}
          onChange={onHourChange}
          placeholder="Hours"
        />
        <input
          className="bg-transparent border-2 border-dark-info rounded-xl p-2 mr-2"
          type="number"
          min="0"
          max="59"
          value={minutes}
          onChange={onMinuteChange}
          placeholder="Minutes"
        />
      </div>
    </div>
  );
};

export default TimeInput;
