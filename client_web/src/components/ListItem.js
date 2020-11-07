import React from "react";
import PropTypes from "prop-types";

export default function ListItem({ food, chosenOptions, onClickFn }) {
  console.log({ food, chosenOptions });
  return (
    <li className="border-b p-1 text-sm hover:bg-gray-300" onClick={onClickFn}>
      <div className="flex justify-between">
        <span>{food.name}</span>
        <span className="text-gray-600 text-xs">
          {chosenOptions &&
            `${chosenOptions.chosenAmount} ${
              chosenOptions.serving.servingName
            }${chosenOptions.chosenAmount > 1 && "s"} ${
              chosenOptions.serving.servingSize
            }${food.isLiquid ? "mL" : "g"}`}
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
