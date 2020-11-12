import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle as fasFaCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle as farFaCircle } from "@fortawesome/free-regular-svg-icons";

export default function ListItem({
  food,
  chosenOptions,
  onClickFn,
  showSelectBtn = false,
}) {
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(false);
  }, [showSelectBtn]);

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

  function handleClick() {
    if (showSelectBtn) {
      setSelected(!selected);
      onClickFn();
    } else {
      onClickFn();
    }
  }

  return (
    <li
      className={`border-b appearance-none p-1 text-sm ${
        !showSelectBtn ? "hover:bg-gray-300" : ""
      } `}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex">
        <div className="grid place-items-center pr-2">
          {showSelectBtn && <SelectBtn selected={selected} hovered={hovered} />}
        </div>
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
  itemId: PropTypes.string.isRequired,
  food: PropTypes.object.isRequired,
  chosenOptions: PropTypes.object,
  onClickFn: PropTypes.func,
  showSelectBtn: PropTypes.bool,
};

const SelectBtn = ({ hovered, selected }) => {
  if (selected) {
    return <FontAwesomeIcon className="text-blue-500" icon={fasFaCircle} />;
  } else if (hovered) {
    return <FontAwesomeIcon className="text-gray-600" icon={fasFaCircle} />;
  } else {
    return <FontAwesomeIcon className="text-gray-700" icon={farFaCircle} />;
  }
};
