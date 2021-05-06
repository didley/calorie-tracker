import React from "react";

type ViewAsCalToggleProps = {
  onClick:  React.MouseEventHandler<HTMLButtonElement>,
  viewAsCal: Boolean,
  className? : String
}

const ViewAsCalToggle = ({ onClick, viewAsCal, className }: ViewAsCalToggleProps)=> {
  return (
    <button
      onClick={onClick}
      className={`text-gray-500 mx-1 rounded leading-tight focus:outline-none focus:border-gray-500 hover:text-red-500 hover:border-1 hover:bg-white bg-gray-200 ${className}`}
    >
      <div className="grid py-1 px-2">
        <small
          className={`text-center ${
            !viewAsCal ? "text-red-500" : "text-gray-500"
          }`}
        >
          KJ
        </small>
        <hr className="border-gray-400" />
        <small
          className={`text-center ${
            viewAsCal ? "text-red-500" : "text-gray-500"
          }`}
        >
          Cal
        </small>
      </div>
    </button>
  );
}

export default ViewAsCalToggle
