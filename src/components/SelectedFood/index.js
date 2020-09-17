import React, { useState } from "react";
import Table from "./Table";
import AmountInput from "./AmountInput";

export default function SelectedFood({ selected }) {
  console.log({ selected });
  const {
    servingOptions = [],
    macros = {},
    brand,
    name,
    perServeSize,
    isLiquid,
  } = selected;

  const defaultServingOptions = [
    {
      id: "serve",
      servingName: "1 Serving",
      servingSize: perServeSize,
    },
    {
      id: "g",
      servingName: "g",
      servingSize: 1,
    },
  ];

  const servingOptionsArr = [...defaultServingOptions, ...servingOptions];

  // const [chosenAmount, setChosenAmount] = useState(1);
  const [amountInput, setAmountInput] = useState({
    chosenAmount: 1,
    servingChoice: defaultServingOptions[0],
    index: 0,
  });

  console.log({ servingOptionsArr });
  // todo: getting macros adjusted to size option
  let adjustedMacros = { ...macros };

  // for (let macro in adjustedMacros) {
  //   adjustedMacros[macro] =
  //     (adjustedMacros[macro] / servingSize.value) *
  //     servingChoice.grams *
  //     chosenAmount;
  // }

  // console.log({ adjustedMacros, servingSize, chosenAmount });

  const onChosenAmountChange = (e) => {
    setAmountInput({
      ...amountInput,
      chosenAmount: parseInt(e.target.value),
    });
  };

  const onAmountInputChange = (e) => {
    setAmountInput({
      ...amountInput,
      servingChoice: servingOptionsArr[e.target.value],
      index: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log({ amountInput });
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
        selected={selected}
        servingOptionsArr={servingOptionsArr}
        onChosenAmountChange={onChosenAmountChange}
        amountInput={amountInput}
        onAmountInputChange={onAmountInputChange}
      />
      <Table macros={adjustedMacros} />
    </div>
  );
}
