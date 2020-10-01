import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerContainer({
  selectedDate,
  handleDateChange,
}) {
  return (
    <button>
      Date
      <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={Date.parse(selectedDate)}
        onChange={(date) => handleDateChange(date)}
      />
    </button>
  );
}
