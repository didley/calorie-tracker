import React from "react";

export default function ResultsList({ data, onSelect }) {
  console.log(data);
  return (
    <div className="bg-white p-3 m-2 rounded-lg shadow-lg md:max-w-md">
      ResultsList
      {data && (
        <ul>
          {data.map((food) => (
            <li key={food.id} onClick={() => onSelect(food)}>
              {food.name} <br />
              <span className="text-gray-500">{food.EnergyKj}kj</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
