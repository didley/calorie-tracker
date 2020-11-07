import React from "react";

export default function DiaryItem({ food }) {
  const { chosenOptions, food_id } = food;
  return (
    <li className="border-b p-1 text-sm text-left hover:bg-gray-300">
      {food_id.name} <br />
      <span className="text-gray-500">
        {food_id.brand && food_id.brand}, {chosenOptions.chosenMacros.EnergyKJ}
        kj
      </span>
    </li>
  );
}
