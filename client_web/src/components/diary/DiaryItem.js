import React from "react";

export default function DiaryItem({ food }) {
  return (
    <li
      key={food.id}
      style={{ width: "100%" }}
      className="p-1 text-left hover:bg-gray-300"
    >
      {food.name} <br />
      <span className="text-gray-500">
        {food.brand && food.brand}, {food.EnergyKj}kj
      </span>
      <hr />
    </li>
  );
}
