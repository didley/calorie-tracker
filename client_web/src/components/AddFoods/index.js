import React, { useState } from "react";

import SelectedFood from "../SelectedFood";
import FoodTabs from "./FoodTabs";

export default function AddFoods() {
  const [selectedFood, setSelectedFood] = useState({});

  return (
    <div className="flex items-start justify-center flex-wrap mt-2">
      <SelectedFood selectedFood={selectedFood} />
      <FoodTabs setSelectedFood={setSelectedFood} />
    </div>
  );
}
