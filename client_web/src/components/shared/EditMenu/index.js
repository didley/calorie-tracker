import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import dateOnly from "utils/dateOnly";

import { useAddFood, useRemoveFoods } from "hooks/useDiary";

const propTypes = {
  selectedItems: PropTypes.array.isRequired,
  selectedDate: PropTypes.string.isRequired,
};
export default function EditMenu({
  selectedItems,
  selectedDate,
  setShowSelectBtn,
}) {
  const initialState = {
    showDatePicker: false,
    showSelected: true,
    showMove: true,
    showCopy: true,
    showConfirmation: false,
    showDelete: true,
    showCancel: false,
  };

  const [state, setState] = useState(initialState);
  const [selectedEditDate, setSelectedEditDate] = useState(selectedDate);
  const addFoodsMutation = useAddFood();
  const removeFoodsMutation = useRemoveFoods();

  function handleMove() {
    if (state.showDatePicker) {
      const itemsNoIDs = selectedItems.map(
        ({ _id, ...removedIdItem }) => removedIdItem
      );
      addFoodsMutation.mutate({
        date: selectedEditDate,
        listName: "toEat",
        items: itemsNoIDs,
      });

      const selectedIds = selectedItems.map((item) => item._id);
      removeFoodsMutation.mutate({
        date: selectedDate,
        selectedIds,
      });

      setState(initialState);
      setShowSelectBtn(false);
      return;
    }
    setState({
      showDatePicker: true,
      showSelected: false,
      showMove: true,
      showCopy: false,
      showConfirmation: false,
      showDelete: false,
      showCancel: true,
    });
  }

  function handleCopy() {
    if (state.showDatePicker) {
      console.log({ selectedEditDate });
      console.log({ selectedItems });
      const itemsNoIDs = selectedItems.map(
        ({ _id, ...removedIdItem }) => removedIdItem
      );

      addFoodsMutation.mutate({
        date: selectedEditDate,
        listName: "toEat",
        items: itemsNoIDs,
      });

      setState(initialState);
      setShowSelectBtn(false);
      return;
    }
    setState({
      showDatePicker: true,
      showSelected: false,
      showMove: false,
      showCopy: true,
      showConfirmation: false,
      showDelete: false,
      showCancel: true,
    });
  }

  function handleDelete() {
    if (state.showConfirmation) {
      const selectedIds = selectedItems.map((item) => item._id);

      removeFoodsMutation.mutate({
        date: selectedDate,
        selectedIds,
      });
      setState(initialState);
      setShowSelectBtn(false);
      return;
    }
    setState({
      showDatePicker: false,
      showSelected: true,
      showMove: false,
      showCopy: false,
      showConfirmation: true,
      showDelete: true,
      showCancel: true,
    });
  }

  return (
    <div
      className={`inline-flex shadow-md ${
        selectedItems.length === 0 ? "opacity-50" : null
      }`}
    >
      {state.showDatePicker && (
        <div className="bg-gray-700 text-gray-100 rounded-l">
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={Date.parse(selectedEditDate)}
            onChange={(date) => {
              setSelectedEditDate(dateOnly(date));
            }}
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
          disabled={selectedItems.length === 0}
          className="bg-gray-300 hover:bg-gray-400 border-r border-white text-gray-800 font-bold text-sm py-2 px-4"
          onClick={handleMove}
        >
          Move
        </button>
      )}
      {state.showCopy && (
        <button
          disabled={selectedItems.length === 0}
          className="bg-gray-300 hover:bg-gray-400 border-r border-white text-gray-800 font-bold text-sm py-2 px-4"
          onClick={handleCopy}
        >
          Copy
        </button>
      )}
      {state.showDelete && (
        <button
          disabled={selectedItems.length === 0}
          className="bg-gray-300 hover:bg-red-600 hover:text-gray-100 text-red-600 font-bold text-sm py-2 px-4 rounded-r"
          onClick={handleDelete}
        >
          Delete
        </button>
      )}
      {state.showCancel && (
        <button
          className="bg-gray-300 hover:bg-gray-400 border-r border-white text-gray-600 font-bold text-sm py-2 px-4 rounded-r"
          onClick={() => setState(initialState)}
        >
          Cancel
        </button>
      )}
    </div>
  );
}

EditMenu.protoTypes = propTypes;
