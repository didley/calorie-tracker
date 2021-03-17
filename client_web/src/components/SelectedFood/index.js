import React, { useState, useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { parseQuery } from "utils/parseQuery";
import Table from "./Table";
import AmountInput from "./AmountInput";
import { Button } from "components/shared/styling";
import { useAddFood } from "hooks/useDiary";

export default function SelectedFood({
  selectedFood,
  editBtnOnClick,
  showEditBtn = true,
}) {
  const {
    isLiquid,
    servingOptions = [],
    macrosPerServe = {},
    brand,
    name,
    perServeSize = 0,
  } = selectedFood;

  const [chosenServing, setChosenServing] = useState({});
  const location = useLocation();
  const params = parseQuery(location.search);
  const addFoodMutation = useAddFood();

  useEffect(() => {
    setChosenServing({
      chosenAmount: 1,
      servingChoice: {
        _id: "serve",
        servingName: "Serving",
        servingSize: perServeSize,
      },
      index: 0,
    });
  }, [selectedFood, perServeSize]);

  const servingOptionsWithDefaults = [
    {
      _id: "serve",
      servingName: "Serving",
      servingSize: perServeSize,
    },
    {
      _id: isLiquid ? "mL" : "g",
      servingName: isLiquid ? "mL" : "g",
      servingSize: 1,
    },
    ...servingOptions,
  ];

  let adjustedMacros = { ...macrosPerServe };
  for (let macro in adjustedMacros) {
    adjustedMacros[macro] =
      (adjustedMacros[macro] / perServeSize) *
      chosenServing.servingChoice.servingSize *
      chosenServing.chosenAmount;
    adjustedMacros[macro] = parseFloat(adjustedMacros[macro].toFixed(1)); // rounds to one decimal
  }

  const onAmountChange = (e) => {
    setChosenServing({
      ...chosenServing,
      chosenAmount: parseInt(e.target.value),
    });
  };

  const onSizeChange = (e) => {
    setChosenServing({
      ...chosenServing,
      servingChoice: servingOptionsWithDefaults[e.target.value],
      index: e.target.value,
    });
  };

  function handleSubmit() {
    const foodItem = {
      chosenFood: selectedFood._id,
      chosenOptions: {
        serving: chosenServing.servingChoice,
        chosenAmount: chosenServing.chosenAmount,
        chosenMacros: adjustedMacros,
      },
    };

    addFoodMutation.mutate({
      date: params.date,
      listName: params.list,
      items: foodItem,
    });
    //TODO: error handling
  }

  if (addFoodMutation.isSuccess)
    return <Redirect to={`/diary/${params.date}`} />;
  if (Object.keys(selectedFood).length === 0) {
    return (
      <div
        className={`border-2 border-gray-600 flex-col bg-white p-3 mb-2 rounded-lg shadow-lg max-w-xs w-full sm:mx-2 bg-gray-200`}
      >
        <h5 className="m-auto text-center text-gray-800 py-24">
          Select a Food
        </h5>
      </div>
    );
  }
  return (
    <div className="border border-blue-600 shadow-outline flex-col bg-white p-3 mb-2 rounded-lg shadow-lg max-w-xs w-full sm:mx-2">
      <div className="flex justify-between mb-1">
        <h6 className="my-auto">Selected Food</h6>
        <div>
          {showEditBtn && (
            <button
              onClick={editBtnOnClick}
              className="self-center text-center text-xs appearance-none text-gray-500 py-1 px-2 mx-1 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 hover:text-red-500 hover:bg-gray-200"
            >
              Edit
            </button>
          )}
          <Button
            color="green"
            loading={addFoodMutation.isLoading}
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded m-1"
          >
            Add
          </Button>
        </div>
      </div>
      <hr />
      <h5>{name && name}</h5>
      <p>{brand && brand}</p>
      <hr />
      <AmountInput
        isLiquid={isLiquid}
        servingOptions={servingOptionsWithDefaults}
        chosenServing={chosenServing}
        onAmountChange={onAmountChange}
        onSizeChange={onSizeChange}
      />
      <Table macros={adjustedMacros} />
    </div>
  );
}
