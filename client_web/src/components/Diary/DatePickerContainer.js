import React from "react";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerContainer({
  selectedDate,
  handleDateChange,
}) {
  const today = new Date().toISOString().substr(0, 10);

  function adjustDate(date, adjustmentAmount) {
    return addDays(new Date(date), adjustmentAmount);
  }

  return (
    <div className="flex justify-center w-full max-w-sm bg-white p-3 m-2 rounded-lg shadow-lg">
      <label className="tracking-wide text-gray-700 text-xs font-bold py-1 mx-2">
        Date
      </label>
      <button
        onClick={() => handleDateChange(adjustDate(selectedDate, -1))}
        className="text-center text-sm appearance-none bg-gray-300 border text-gray-700 py-1 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 hover:text-red-500 hover:bg-gray-200"
      >
        {"<"}
      </button>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={Date.parse(selectedDate)}
        onChange={(date) => handleDateChange(date)}
        className="w-24 mx-1 text-center text-sm appearance-none border text-gray-700 py-1 px-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 hover:text-red-500 hover:bg-gray-100"
      />

      <button
        onClick={() => handleDateChange(adjustDate(selectedDate, +1))}
        className="text-center text-sm appearance-none bg-gray-300 border text-gray-700 py-1 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 hover:text-red-500 hover:bg-gray-200"
      >
        {">"}
      </button>
      {today !== selectedDate && (
        <button
          onClick={() => handleDateChange(today)}
          className="text-center text-xs appearance-none text-gray-500 py-1 px-2 mx-1 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 hover:text-red-500 hover:bg-gray-200"
        >
          Today
        </button>
      )}
    </div>
  );
}
