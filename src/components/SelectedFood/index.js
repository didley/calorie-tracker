import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Table from "./Table";
import AmountInput from "./AmountInput";

export default function SelectedFood({ selected }) {
  const {
    servingOptions = [],
    macros = {},
    brand,
    name,
    perServeSize = 0,
  } = selected;

  // TODO: amount input not allowing decimal

  const [amountInput, setAmountInput] = useState({});
  const [diaryRedirect, setDiaryRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setAmountInput({
      chosenAmount: 1,
      servingChoice: defaultServingOptions[0],
      index: 0,
    });
    // eslint-disable-next-line
  }, [selected]);

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

  console.log({ selected });
  console.log({ servingOptionsArr });

  let adjustedMacros = { ...macros };

  for (let macro in adjustedMacros) {
    adjustedMacros[macro] =
      (adjustedMacros[macro] / perServeSize) *
      amountInput.servingChoice.servingSize *
      amountInput.chosenAmount;
    adjustedMacros[macro] = parseFloat(adjustedMacros[macro].toFixed(1)); // rounds to one decimal
  }

  console.log({ adjustedMacros });

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
  // TODO: implement POST
  const handleSubmit = () => {
    const addFoodObject = {
      ...selected,
      chosen: {
        serving: amountInput.servingChoice,
        chosenAmount: amountInput.chosenAmount,
        chosenMacros: adjustedMacros,
      },
    };

    // TODO: get params query params with post request
    async function addFood(routName, data) {
      // eg. GET to /users is getFoods("users")
      try {
        setLoading(true);
        await axios.post(`/${routName}`, data);
        setLoading(false);
        setDiaryRedirect(true);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    addFood(addFoodObject);
  };

  if (diaryRedirect) {
    return <Redirect to={`/diary`} />;
  }

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
          {loading ? <i className="animate-spin fas fa-circle-notch" /> : "Add"}
        </button>
      </div>
      <hr />
      <p>{brand}</p>
      <h4>{name}</h4>
      <hr />
      <AmountInput
        selected={selected}
        servingOptionsArr={servingOptionsArr}
        amountInput={amountInput}
        onChosenAmountChange={onChosenAmountChange}
        onAmountInputChange={onAmountInputChange}
      />
      <Table macros={adjustedMacros} />
    </div>
  );
}
