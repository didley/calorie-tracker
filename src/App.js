import React from "react";

import AddFoods from "./components/AddFoods";

// style={{ background: "#faf7f4", height: "100vh" }}

function App() {
  return (
    <div className="bg-orange-100 min-h-screen">
      <div className="px-3 py-8 mx-auto max-w-4xl">
        <h1 className="bg-white p-2 rounded-lg shadow-lg ">
          <b>Calorie Tracker</b>
        </h1>

        <AddFoods />
      </div>
    </div>
  );
}

export default App;
