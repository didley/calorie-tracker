import React from "react";

export default function MyFoods({ data, onSelect }) {
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="my-auto">My Foods</h3>
        <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded m-1">
          Add
        </button>
      </div>
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
