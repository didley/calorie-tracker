import React, { useState } from "react";
import PropTypes from "prop-types";

export default function ListItem({
  food,
  chosenOptions,
  onClickFn,
  showSelectBtn = false,
}) {
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);

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
      className={`border-b appearance-none p-1 text-sm ${
        !showSelectBtn ? "hover:bg-gray-300" : ""
      } `}
      onClick={onClickFn}
    >
      <div className="flex">
        {showSelectBtn && <selectBtn />}
        <div className="flex-auto">
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
        </div>
      </div>
    </li>
  );
}

ListItem.propTypes = {
  food: PropTypes.object.isRequired,
  chosenOptions: PropTypes.object,
  onClickFn: PropTypes.func,
  showSelectBtn: PropTypes.bool,
};

const selectBtn = ({ props }) => {
  const classes = {
    default: "far fa-curcle text-gray-600",
    hovered: "fas fa-curcle text-gray-600",
    selected: "fas fa-curcle text-blue-600",
  };

  let iconClass;
  if (props === "selected") {
    iconClass = classes.selected;
  } else if (props === "hovered") {
    iconClass = classes.hovered;
  } else {
    iconClass = classes.default;
  }
  return (
    <div className="flex-none pr-1 self-center">
      <i className="far fa-curcle text-gray-600" />
    </div>
  );
};
