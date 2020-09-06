import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
      <Link to="/diary">{"< Back"}</Link>
      <div className="flex justify-center flex-wrap md:items-start">
        <SelectedFood selected={selected} />
        <FoodTabs onSelect={onSelect} />
      </div>
    </div>
  );
}
