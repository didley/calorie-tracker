import React from "react";
import SearchBar from "./SearchBar";
import ResultsList from "./ResultsList";
import ItemDetail from "./ItemDetail";

export default function NutritionFacts() {
  return (
    <div>
      NutritionFacts page
      <SearchBar />
      <ResultsList />
      <ItemDetail />
    </div>
  );
}
