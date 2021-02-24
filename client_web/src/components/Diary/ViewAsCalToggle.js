import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  onClick: PropTypes.func,
  viewAsCal: PropTypes.bool.isRequired,
};

export default function ViewAsCalToggle({ onClick, viewAsCal, className }) {
  return (
    <button
      onClick={onClick}
      className={
        "text-gray-500 mx-1 rounded leading-tight focus:outline-none focus:border-gray-500 hover:text-red-500 hover:border-1 hover:bg-white bg-gray-200 " +
        className
      }
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

ViewAsCalToggle.propTypes = propTypes;
