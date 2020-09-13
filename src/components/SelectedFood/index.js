import React, { useState, useEffect } from "react";
import Table from "./Table";
import AmountInput from "./AmountInput";

export default function SelectedFood({ selected }) {
  console.log({ selected });
  const {
    servingOptions,
    macros = {},
    brand,
    name,
    servingSize = { value: 0 },
  } = selected;

  const [chosenAmount, setChosenAmount] = useState(1);
  const [servingChoice, setServingChoice] = useState({
    grams: servingSize.value,
  });

  // todo: getting macros adjusted to size option
  let adjustedMacros = { ...macros };

  for (let macro in adjustedMacros) {
    adjustedMacros[macro] =
      (adjustedMacros[macro] / servingSize.value) *
      servingChoice.grams *
      chosenAmount;
  }

  console.log({ adjustedMacros, servingSize, chosenAmount });

  const onChosenAmountChange = (e) => {
    setChosenAmount(parseInt(e.target.value));
  };
  const onServingChoiceChange = (e) => {
    setServingChoice(e.target.value);
  };

  const handleSubmit = () => {
    console.log({ chosenAmount, servingChoice });
  };

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
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded m-1"
        >
          Add
        </button>
      </div>
      <hr />
      <p>{brand}</p>
      <h4>{name}</h4>
      <hr />
      <AmountInput
        servingSize={servingSize}
        servingOptions={servingOptions}
        chosenAmount={chosenAmount}
        onChosenAmountChange={onChosenAmountChange}
        servingChoice={servingChoice}
        onServingChoiceChange={onServingChoiceChange}
      />
      {/* <Table macros={adjustedMacros} /> */}
    </div>
  );
}
