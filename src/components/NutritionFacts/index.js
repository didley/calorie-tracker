import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import ResultsList from "./ResultsList";
import ItemDetail from "./ItemDetail";

export default function NutritionFacts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    getFoods();

    // eslint-disable-next-line
  }, []);

  async function getFoods() {
    try {
      setLoading(true);
      const res = await axios.get("/nutritionFacts/");
      setData(res.data);
      setLoading(false);
      setSelected(res.data[0]);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  const onSelect = (food) => {
    setSelected(food);
  };

  return (
    <div>
      NutritionFacts page
      <div className="grid sm:grid-flow-row md:grid-flow-col md:grid-rows-2 md:grid-cols-2">
        <SearchBar />
        <ResultsList data={data} onSelect={onSelect} />
        <ItemDetail selected={selected} />
      </div>
    </div>
  );
}
