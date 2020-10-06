import React from "react";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerContainer({
  selectedDate,
  handleDateChange,
}) {
  function adjustDate(date, adjustmentAmount) {
    return addDays(new Date(date), adjustmentAmount);
  }

  return (
    <div className="w-full max-w-xs bg-white p-3 m-2 rounded-lg shadow-lg">
      <label className="tracking-wide text-gray-700 text-xs font-bold">
        Date
      </label>

      <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={Date.parse(selectedDate)}
        onChange={(date) => handleDateChange(date)}
        className="w-32 mx-1 text-center appearance-none border text-gray-700 py-1 px-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      />
      <button
        onClick={() => handleDateChange(adjustDate(selectedDate, -1))}
        className="text-center appearance-none bg-gray-200 border text-gray-700 py-1 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      >
        {"<"}
      </button>
      <button
        onClick={() => handleDateChange(adjustDate(selectedDate, +1))}
        className="text-center appearance-none bg-gray-200 border text-gray-700 py-1 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      >
        {">"}
      </button>
    </div>
  );
}
