import React from "react";
import NutritionFacts from "./components/NutritionFacts";

// style={{ background: "#faf7f4", height: "100vh" }}

function App() {
  return (
    <div className="min-h-screen p-20 bg-orange-100">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h1>
          <b>Calorie Tracker</b>
        </h1>
      </div>
      <NutritionFacts />
    </div>
  );
}

export default App;
