import React from "react";
import SearchBar from "./SearchBar";

export default function Foods({ data, onSelect }) {
  return (
    <div>
      <SearchBar />
      <h3>Results</h3>
      <hr />
      {data && (
        <div>
          {data.map((food) => (
            <button
              key={food.id}
              onClick={() => onSelect(food)}
              style={{ width: "100%" }}
              className="p-1 text-left hover:bg-gray-300"
            >
              {food.name} <br />
              <span className="text-gray-500">
                {food.brand && food.brand}, {food.EnergyKj}kj
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
