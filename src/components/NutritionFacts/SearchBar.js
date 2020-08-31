import React from "react";

export default function SearchBar() {
  return (
    <div className="bg-white p-4 m-4 rounded-lg shadow-lg">
      Search bar
      <input type="text" placeholder="search..." />
      <button>Search</button>
    </div>
  );
}
