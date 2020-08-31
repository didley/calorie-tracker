import React from "react";

export default function SearchBar() {
  return (
    <div className="bg-white p-3 m-2 rounded-lg shadow-lg md:max-w-md">
      Search bar
      <input type="text" placeholder="search..." />
      <button>Search</button>
    </div>
  );
}
