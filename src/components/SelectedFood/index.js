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

  console.log({ selected });
  if (selected === {}) {
    return (
      <div className="flex flex-col bg-white p-3 m-2 rounded-lg shadow-lg">
        hi
      </div>
    );
  }

  selected && return (
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
