import React from "react";

export default function AlertDisplay({ alert }) {
  return (
    <div className="flex flex-row bg-blue-500 pl-5">
      <div className="py-1">
        <small className="text-white pl-2">{alert}</small>
      </div>
    </div>
  );
}
