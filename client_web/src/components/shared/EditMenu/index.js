import React, { useReducer, useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";

import { useRemoveFoods } from "hooks/useDiary";

const propTypes = {
  selectedItems: PropTypes.array.isRequired,
  selectedDate: PropTypes.string.isRequired,
};

const initialState = {
  showDatePicker: false,
  showSelected: true,
  showMove: true,
  showCopy: true,
  showDelete: true,
  showCancel: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "MOVE":
      return {
        showDatePicker: true,
        showSelected: false,
        showMove: true,
        showCopy: false,
        showDelete: false,
        showCancel: true,
      };
    case "COPY":
      return {
        showDatePicker: true,
        showSelected: false,
        showMove: false,
        showCopy: true,
        showDelete: false,
        showCancel: true,
      };
    case "CANCEL":
      return initialState;
    default:
      throw new Error();
  }
}

export default function EditMenu({
  selectedItems,
  selectedDate,
  setShowSelectBtn,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedEditDate, setSelectedEditDate] = useState(selectedDate);
  const removeFoodsMutation = useRemoveFoods();

  function handleMove() {
    dispatch({ type: "MOVE" });
    console.log("move event handler");
  }

  function handleCopy() {
    dispatch({ type: "COPY" });
    console.log("copy event handler");
  }

  const handleDelete = () => {
    removeFoodsMutation.mutate({
      date: selectedDate,
      selectedIds: selectedItems,
    });
    setShowSelectBtn(false);
  };

  return (
    <div className="inline-flex shadow-md">
      {state.showDatePicker && (
        <div className="bg-gray-700 text-gray-100 rounded-l">
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={Date.parse(selectedEditDate)}
            onChange={(date) => setSelectedEditDate(date)}
            className="w-24 text-center bg-gray-700 text-gray-100 appearance-none px-1 border-none h-10 leading-tight focus:outline-none focus:bg-gray-700 hover:text-red-500"
          />
        </div>
      )}
      {state.showSelected && (
        <div className="bg-gray-700 text-gray-100 text-sm py-2 px-2 rounded-l">
          {selectedItems.length} Selected
        </div>
      )}
      {state.showMove && (
        <button
          className="bg-gray-300 hover:bg-gray-400 border-r border-white text-gray-800 font-bold text-sm py-2 px-4"
          onClick={handleMove}
        >
          Move
        </button>
      )}
      {state.showCopy && (
        <button
          className="bg-gray-300 hover:bg-gray-400 border-r border-white text-gray-800 font-bold text-sm py-2 px-4"
          onClick={handleCopy}
        >
          Copy
        </button>
      )}
      {state.showDelete && (
        <button
          className="bg-gray-300 hover:bg-red-600 hover:text-gray-100 text-red-600 font-bold text-sm py-2 px-4 rounded-r"
          onClick={handleDelete}
        >
          Delete
        </button>
      )}
      {state.showCancel && (
        <button
          className="bg-gray-300 hover:bg-gray-400 border-r border-white text-gray-600 font-bold text-sm py-2 px-4 rounded-r"
          onClick={() => {
            dispatch({ type: "CANCEL" });
            setSelectedEditDate(selectedDate);
          }}
        >
          Cancel
        </button>
      )}
    </div>
  );
}

EditMenu.protoTypes = propTypes;
