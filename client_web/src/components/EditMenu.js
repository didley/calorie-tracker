import React from "react";
import PropTypes from "prop-types";

export default function EditMenu({ selectedItems }) {
  function handleMove() {
    // TODO
    console.log("move event handler");
  }

  function handleCopy() {
    // TODO
    console.log("copy event handler");
  }

  function handleDelete() {
    // TODO
    console.log("delete event handler");
  }

  return (
    <div className="inline-flex shadow-md">
      <div className="bg-gray-700 text-gray-100 text-sm py-2 px-2 rounded-l">
        {selectedItems.length} Selected
      </div>
      <button
        className="bg-gray-300 border-l-1 border-white hover:bg-gray-400 border-r text-gray-800 font-bold text-sm py-2 px-4 rounded-l"
        onClick={handleMove}
      >
        Move
      </button>
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold text-sm py-2 px-4"
        onClick={handleCopy}
      >
        Copy
      </button>
      <button
        className="bg-red-600 hover:bg-red-400 text-gray-100 font-bold text-sm py-2 px-4 rounded-r"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}

EditMenu.protoTypes = {
  selectedItems: PropTypes.array.isRequired,
};
