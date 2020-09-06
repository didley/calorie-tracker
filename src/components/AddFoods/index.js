import React, { useState } from "react";
import SelectedFood from "./SelectedFood";
import FoodTabs from "./FoodTabs";

export default function AddFoods() {
  const [selected, setSelected] = useState({});

  const onSelect = (food) => {
    setSelected(food);
  };

  return (
    <div>
      <h2>Add Food</h2>
      <div className="grid sm:grid-flow-row md:grid-flow-col">
        <SelectedFood selected={selected} />
        <FoodTabs onSelect={onSelect} />
      </div>
    </div>
  );
}
