import React from "react";

export default function ErrorsDisplay({ error }) {
  return (
    <div className="flex flex-row bg-red-600 pl-5">
      <div>
        <h3 className="text-white">Error</h3>
      </div>
      <div className="py-1">
        <p className="text-white text-xs pl-2">{error}</p>
      </div>
    </div>
  );
}