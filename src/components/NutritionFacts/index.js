import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import ResultsList from "./ResultsList";
import ItemDetail from "./ItemDetail";

export default function NutritionFacts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   getFoods();
  //   // eslint-disable-next-line
  // }, []);

  // // function getFoods() {
  // //   axios.get("/nutritionFacts/").then((res) => {
  // //     setData(res.data);
  // //     console.log(res.data);
  // //   });
  // // }

  // getFoods();

  return (
    <div>
      NutritionFacts page
      <div className="grid sm:grid-flow-row md:grid-flow-col md:grid-rows-2 md:grid-cols-2">
        <SearchBar />
        <ResultsList />
        <ItemDetail />
      </div>
    </div>
  );
}
