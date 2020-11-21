import React from "react";

export default function SearchBar() {
  return (
    <div className="flex">
      <input
        className="mr-2 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal text-sm"
        type="text"
        placeholder="search..."
      />
      <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded text-sm">
        Search
      </button>
    </div>
  );
}
