import React from "react";

export default function ErrorsDisplay({ error }) {
  return (
    <div className="flex flex-row bg-red-600 pl-5">
      <div className="py-1">
        <small className="text-white pl-2">
          <span className="font-bold">Error </span>
          {error}
        </small>
      </div>
    </div>
  );
}
