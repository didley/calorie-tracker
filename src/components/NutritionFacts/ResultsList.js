import React from "react";

export default function ResultsList({ data, onSelect }) {
  return (
    <div className="bg-white p-3 m-2 rounded-lg shadow-lg md:max-w-md">
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
