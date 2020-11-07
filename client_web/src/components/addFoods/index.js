import React, { useState } from "react";
import { Link } from "react-router-dom";
import SelectedFood from "../selectedFood";
import FoodTabs from "./FoodTabs";

export default function AddFoods({ setIsLoading, setError }) {
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
        <FoodTabs
          onSelect={onSelect}
          setIsLoading={setIsLoading}
          setError={setError}
        />
      </div>
    </div>
  );
}
