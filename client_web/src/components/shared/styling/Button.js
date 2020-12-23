import React from "react";

export default function Button({ color = "blue", otherStyles, children }) {
  return (
    <button
      className={`${otherStyles} bg-${color}-500 rounded m-1 text-white font-bold py-1 px-4 border-b-4 border-${color}-700 hover:border-${color}-500 hover:bg-${color}-400`}
    >
      {children}
    </button>
  );
}
