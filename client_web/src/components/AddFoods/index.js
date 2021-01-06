import React, { useState } from "react";
import { Link } from "react-router-dom";
import SelectedFood from "../SelectedFood";
import FoodTabs from "./FoodTabs";

export default function AddFoods() {
  const [selectedFood, setSelectedFood] = useState({});

  return (
    <div className="flex items-start justify-center flex-wrap mt-2">
      {/* <h2>Add Food</h2> */}
      <SelectedFood selectedFood={selectedFood} />
      <FoodTabs setSelectedFood={setSelectedFood} />
    </div>
  );
}
