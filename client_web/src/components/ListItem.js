import React from "react";
import PropTypes from "prop-types";

export default function ListItem({ food, chosenOptions, onClickFn }) {
  let chosenOptionsSting;
  if (chosenOptions) {
    const { chosenAmount, serving } = chosenOptions;
    chosenOptionsSting = `
    ${chosenAmount} 
    ${serving.servingName}
    ${chosenAmount > 1 ? "s" : ""} 
    ${serving.servingSize * chosenAmount}
    ${food.isLiquid ? "mL" : "g"}`;
  }

  return (
    <li
      className="border-b appearance-none p-1 text-sm hover:bg-gray-300"
      onClick={onClickFn}
    >
      <div className="flex justify-between">
        <span>{food.name}</span>
        <span className="text-gray-600 text-xs">
          {chosenOptions && chosenOptionsSting}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600 text-xs">
          {food.brand && food.brand}
        </span>
        <span className="text-xs">
          {chosenOptions
            ? `${chosenOptions.chosenMacros.EnergyKJ}`
            : food.macrosPerServe.EnergyKJ}
          kJ
        </span>
      </div>
    </li>
  );
}

ListItem.propTypes = {
  food: PropTypes.object.isRequired,
  chosenOptions: PropTypes.object,
  onClickFn: PropTypes.func,
};
