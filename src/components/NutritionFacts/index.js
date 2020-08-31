import React from "react";
import SearchBar from "./SearchBar";
import ResultsList from "./ResultsList";
import ItemDetail from "./ItemDetail";

export default function NutritionFacts() {
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
