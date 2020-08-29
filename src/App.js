import React from "react";

// style={{ background: "#faf7f4", height: "100vh" }}

function Exercise({ name }) {
  return (
    <>
      <h6>{name}</h6>
    </>
  );
}

function App() {
  return (
    <div
      className="min-h-screen p-20"
      style={{ background: "#faf7f4", height: "100vh" }}
    >
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2>Push</h2>
        <p>Hi</p>
        <Exercise name="Deadlifts" />
        <Exercise name="Pushups" />
      </div>
    </div>
  );
}

export default App;
