import React from "react";
import LoadingSpinner from "components/shared/LoadingSpinner";

export default function Button({
  color = "blue",
  otherStyles,
  onClick,
  loading,
  disabled,
  type = "button",
  children,
  ...otherProps
}) {
  return (
    <button
      {...otherProps}
      onClick={onClick}
      type={type}
      className={`text-sm bg-${
        disabled ? "gray" : color
      }-500 rounded text-white font-bold py-1 px-4 border-b-4 border-${
        disabled ? "gray" : color
      }-700 hover:bg-opacity-75 ${otherStyles}`}
    >
      {loading ? <LoadingSpinner white /> : children}
    </button>
  );
}
