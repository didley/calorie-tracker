import React from "react";
import { Button } from "components/shared/styling";

export default function NoteField({ value, onChange }) {
  function handleClick(e) {
    // setData({ ...data, note: e.target.value });
  }

  return (
    <div>
      <h4 className="border-b my-auto pb-1">Notes</h4>
      <div className="relative">
        <textarea
          className="w-full resize-none h-40 mt-2 p-2"
          type="text"
          placeholder="Click here to add a note..."
          value={value}
          onChange={onChange}
        />

        <div className="absolute right-0 bottom-0 mb-3 mr-2 space-x-2">
          <Button type="reset" color="gray">
            Cancel
          </Button>

          <Button onClick={handleClick} loading={false} disabled={false}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
