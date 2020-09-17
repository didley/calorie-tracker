import React from "react";

export default function AmountInput({
  selected,
  servingOptionsArr,
  onChosenAmountChange,
  amountInput,
  onAmountInputChange,
}) {
  const { perServeSize, isLiquid } = selected;
  //todo

  // const calculateServingOptionSize = (servingOptionObj, servingSizeObj) => {
  //   // "g" or "mL"
  //   // "g" or "serving"
  //   if (servingOptionObj.servingUnit === "serving") {
  //     return `(${servingSizeObj.value * servingOptionObj.servingValue}${
  //       perServeSize.unit
  //     })`;
  //   }

  //   return `(${servingOptionObj.value * servingSizeObj.value}${
  //     perServeSize.unit
  //   })`;
  // };

  return (
    <div className="flex">
      <div className="w-1/4 mr-2">
        <label className="block tracking-wide text-gray-700 text-xs font-bold my-1">
          Amount
          <input
            value={amountInput.chosenAmount}
            onChange={onChosenAmountChange}
            className="w-full text-center appearance-none bg-gray-200 border text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="number"
            min="0"
            placeholder="#"
          />
        </label>
      </div>
      <div className="w-3/4">
        <label className="block tracking-wide text-gray-700 text-xs font-bold my-1">
          Size
          <div className="relative">
            <select
              value={amountInput.index}
              onChange={(e) => onAmountInputChange(e)}
              className="w-full block appearance-none bg-gray-200 border text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              {servingOptionsArr &&
                servingOptionsArr.map((option, index) => (
                  <option key={option.id} value={index}>
                    {`${option.servingName} (${option.servingSize}${
                      isLiquid ? "mL" : "g"
                    })`}
                  </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-centre px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
