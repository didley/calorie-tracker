import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default function EditMenu({
  setTimedAlert,
  setIsLoading,
  setError,
  selectedItems,
  selectedDate,
}) {
  function handleMove() {
    // TODO
    console.log("move event handler");
  }

  function handleCopy() {
    // TODO
    console.log("copy event handler");
  }

  async function handleDelete() {
    // TODO: working on <<<<<
    try {
      setIsLoading(true);
      const response = await axios.post(
        `/api/diary/${selectedDate}/delete-food`,
        {
          selectedItems,
        }
      );
      setIsLoading(false);
      setTimedAlert(response.data.msg);
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  }

  return (
    <div className="inline-flex shadow-md">
      <div className="bg-gray-700 text-gray-100 text-sm py-2 px-2 rounded-l">
        {selectedItems.length} Selected
      </div>
      <button
        className="bg-gray-300 hover:bg-gray-400 border-r border-white text-gray-800 font-bold text-sm py-2 px-4"
        onClick={handleMove}
      >
        Move
      </button>
      <button
        className="bg-gray-300 hover:bg-gray-400 border-r border-white text-gray-800 font-bold text-sm py-2 px-4"
        onClick={handleCopy}
      >
        Copy
      </button>
      <button
        className="bg-gray-300 hover:bg-red-600 hover:text-gray-100 text-red-600 font-bold text-sm py-2 px-4 rounded-r"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}

EditMenu.protoTypes = {
  selectedItems: PropTypes.array.isRequired,
  selectedDate: PropTypes.string.isRequired,
};
