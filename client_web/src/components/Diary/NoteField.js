import React from "react";
import LoadingSpinner from "components/shared/LoadingSpinner";

export default function NoteField({ loading, ...props }) {
  return (
    <div>
      <h4 className="border-b my-auto pb-1">Notes</h4>
      <div className="relative">
        <textarea
          className="w-full resize-none h-40 mt-2 p-2"
          type="text"
          placeholder="Click here to add a note..."
          {...props}
        />

        <div className="absolute right-0 bottom-0 mb-3 mr-2 space-x-2">
          {loading ? <LoadingSpinner size="sm" /> : null}
        </div>
      </div>
    </div>
  );
}
