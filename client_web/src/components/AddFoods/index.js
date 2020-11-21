import React, { useState } from "react";
import { Link } from "react-router-dom";
import SelectedFood from "../SelectedFood";
import FoodTabs from "./FoodTabs";

export default function AddFoods({ setTimedAlert, setIsLoading, setError }) {
  const [selectedFood, setSelectedFood] = useState({});

  return (
    <div>
      <h2>Add Food</h2>
      <Link to="/diary">{"< Back"}</Link>
      <div className="flex items-start justify-center flex-wrap">
        <SelectedFood
          selectedFood={selectedFood}
          setTimedAlert={setTimedAlert}
          setIsLoading={setIsLoading}
          setError={setError}
        />
        <FoodTabs
          setSelectedFood={setSelectedFood}
          setIsLoading={setIsLoading}
          setError={setError}
        />
      </div>
    </div>
  );
}
