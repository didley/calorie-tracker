import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Table from "./Table";
import AmountInput from "./AmountInput";
import LoadingSpinner from "components/shared/LoadingSpinner";

import { useAlert } from "hooks/useAlert";

export default function SelectedFood({ selectedFood }) {
  const [amountInput, setAmountInput] = useState({});
  const [diaryRedirect, setDiaryRedirect] = useState(false);
  const [_isLoading, _setIsLoading] = useState(false);

  const { setTimedAlert } = useAlert();

  const {
    servingOptions = [],
    macrosPerServe = {},
    brand,
    name,
    perServeSize = 0,
  } = selectedFood;

  const defaultServingOptions = [
    {
      _id: "serve",
      servingName: "1 Serving",
      servingSize: perServeSize,
    },
    {
      _id: "g",
      servingName: "g",
      servingSize: 1,
    },
  ];

  useEffect(() => {
    setAmountInput({
      chosenAmount: 1,
      servingChoice: defaultServingOptions[0],
      index: 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFood]);

  const servingOptionsArr = [...defaultServingOptions, ...servingOptions];

  let adjustedMacros = { ...macrosPerServe };

  for (let macro in adjustedMacros) {
    adjustedMacros[macro] =
      (adjustedMacros[macro] / perServeSize) *
      amountInput.servingChoice.servingSize *
      amountInput.chosenAmount;
    adjustedMacros[macro] = parseFloat(adjustedMacros[macro].toFixed(1)); // rounds to one decimal
  }

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

  async function handleSubmit() {
    const URLParams = new URLSearchParams(window.location.search);
    const dateParam = URLParams.get("date");
    const listParam = URLParams.get("list");
    console.log({ dateParam, listParam });

    const addFoodObj = {
      food_id: selectedFood._id,
      chosenOptions: {
        serving: amountInput.servingChoice,
        chosenAmount: amountInput.chosenAmount,
        chosenMacros: adjustedMacros,
      },
    };

    try {
      _setIsLoading(true);
      await axios.post(
        `/api/diary/${dateParam}/add-food?list=${listParam}`,
        addFoodObj
      );
      _setIsLoading(false);
      setTimedAlert("alert", `${name} added to ${listParam} list`);
      setDiaryRedirect(true);
    } catch (err) {
      setTimedAlert("error", err);
      _setIsLoading(false);
    }
  }

  const containerStyle =
    "border-2 border-gray-600 flex-col bg-white p-3 mb-2 rounded-lg shadow-lg max-w-xs w-full sm:mx-2";

  if (Object.keys(selectedFood).length === 0) {
    return (
      <div className={`${containerStyle} bg-gray-200`}>
        <h3 className="m-auto text-center text-gray-800 py-24">
          Select a Food
        </h3>
      </div>
    );
  }

  if (diaryRedirect) return <Redirect to={`/diary`} />;
  return (
    <div className={containerStyle}>
      <div className="flex justify-between">
        <h3 className="my-auto">Selected Food</h3>
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded m-1"
        >
          {_isLoading ? <LoadingSpinner white /> : "Add"}
        </button>
      </div>
      <hr />
      <h4>{name}</h4>
      <p>{brand && brand}</p>
      <hr />
      <AmountInput
        selected={selectedFood}
        servingOptionsArr={servingOptionsArr}
        amountInput={amountInput}
        onChosenAmountChange={onChosenAmountChange}
        onAmountInputChange={onAmountInputChange}
      />
      <Table macros={adjustedMacros} />
    </div>
  );
}
