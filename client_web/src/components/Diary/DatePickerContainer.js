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
    <div className="inline-grid grid-cols-5 items-center w-full max-w-sm bg-white p-3 m-2 rounded-lg shadow-lg">
      <label className="col-span-1 justify-self-center">Date</label>

      <div className="col-span-3 inline-grid grid-cols-5 gap-2">
        <button
          onClick={() => handleDateChange(adjustDate(selectedDate, -1))}
          className="col-span-1 text-center text-sm appearance-none bg-gray-300 border text-gray-700 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 hover:text-red-500 hover:bg-gray-200"
        >
          {"<"}
        </button>
        <div className="col-span-3">
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={Date.parse(selectedDate)}
            onChange={(date) => handleDateChange(date)}
            className="w-full text-center text-sm appearance-none border text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 hover:text-red-500 hover:bg-gray-100"
          />
        </div>
        <button
          onClick={() => handleDateChange(adjustDate(selectedDate, +1))}
          className="col-span-1 text-center text-sm appearance-none bg-gray-300 border text-gray-700 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 hover:text-red-500 hover:bg-gray-200"
        >
          {">"}
        </button>
      </div>
      {today !== selectedDate && (
        <button
          onClick={() => handleDateChange(today)}
          className="justify-self-center col-span-1 text-center text-xs appearance-none text-gray-500 py-1 px-2 mx-1 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 hover:text-red-500 hover:bg-gray-200"
        >
          Today
        </button>
      )}
    </div>
  );
}
