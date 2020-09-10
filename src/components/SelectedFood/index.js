import React, { useState } from "react";
import Table from "./Table";
import AmountInput from "./AmountInput";

export default function SelectedFood({ selected }) {
  console.log({ selected });
  const { weightOptions, brand = "Select a food", name = "-" } = selected;

  const [servingAmount, setServingAmount] = useState(1);
  const [servingSize, setServingSize] = useState("");

  const handleServingAmountChange = (e) => {
    setServingAmount(e.target.value);
  };
  const handleServingSizeChange = (e) => {
    setServingSize(e.target.value);
  };

  const handleSubmit = () => {};

  if (Object.keys(selected).length === 0) {
    return (
      <div className="border-4 border-gray-600 py-24 h-64 w-1/3 bg-white m-2 rounded-lg shadow-lg bg-gray-200">
        <h3 className="margin-auto text-center text-gray-800">Select a Food</h3>
      </div>
    );
  }

  return (
    <div className="flex border-2 border-gray-600 flex-col bg-white p-3 m-2 rounded-lg shadow-lg">
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
      <AmountInput
        weightOptions={weightOptions}
        servingAmount={servingAmount}
        handleServingAmountChange={handleServingAmountChange}
        servingSize={servingSize}
        handleServingSizeChange={handleServingSizeChange}
      />
      <Table selected={selected} />
    </div>
  );
}
