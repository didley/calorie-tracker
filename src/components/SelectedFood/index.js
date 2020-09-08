import React, { useState } from "react";
import Table from "./Table";
import AmountInput from "./AmountInput";

export default function SelectedFood({ selected }) {
  console.log({ selected });
  const { weightOptions, brand = "Select a food", name = "-" } = selected;

  const [servingAmmount, setServingAmmount] = useState(1);
  const [servingSize, setServingSize] = useState("");

  return (
    <div className="flex flex-col bg-white p-3 m-2 rounded-lg shadow-lg">
      <div className="flex justify-between">
        <h3 className="my-auto">Selected Food</h3>
        <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded m-1">
          Add
        </button>
      </div>
      <hr />
      <p>{brand}</p>
      <h4>{name}</h4>
      <hr />
      <AmountInput weightOptions={weightOptions} />
      <Table selected={selected} />
    </div>
  );
}
