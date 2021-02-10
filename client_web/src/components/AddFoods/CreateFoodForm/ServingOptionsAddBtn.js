import React from "react";

export default function ServingOptionsAddBtn({ values, push }) {
  const SERVING_OPTIONS_LIMIT = 5;
  const limitReached = values.servingOptions.length >= SERVING_OPTIONS_LIMIT;

  return (
    <button
      type="button"
      onClick={() => {
        if (!limitReached) {
          push({ servingName: "", servingSize: null });
        }
      }}
      disabled={limitReached}
      className={`w-full bg-green-500 text-white font-bold mt-1 rounded-sm hover:bg-green-300 ${
        limitReached ? "opacity-50 cursor-not-allowed" : null
      }`}
    >
      +
    </button>
  );
}
