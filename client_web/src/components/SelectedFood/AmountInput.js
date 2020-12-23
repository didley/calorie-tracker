import React from "react";

export default function AmountInput({
  isLiquid,
  servingOptions,
  chosenServing,
  onAmountChange,
  onSizeChange,
}) {
  return (
    <div className="flex">
      <div className="w-1/4 mr-2">
        <label htmlFor="amount" className="tracking-wide text-gray-700 text-xs">
          Amount
          <input
            value={chosenServing.chosenAmount}
            onChange={onAmountChange}
            className="py-2"
            type="number"
            min="0"
            placeholder="#"
          />
        </label>
      </div>
      <div className="w-3/4">
        <label className="tracking-wide text-gray-700 text-xs">
          Size
          <div className="relative">
            <select
              value={chosenServing.index}
              onChange={onSizeChange}
              disabled={servingOptions.length === 0 ? true : false}
              className="py-2"
            >
              {servingOptions &&
                servingOptions.map((option, index) => (
                  <option key={option._id} value={index}>
                    {`${option.servingName} (${option.servingSize}${
                      isLiquid ? "mL" : "g"
                    })`}
                  </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
          </div>
        </label>
      </div>
    </div>
  );
}
