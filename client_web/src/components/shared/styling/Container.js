import React from "react";

export default function Container({ children }) {
  return (
    <div className="bg-white p-3 mx-1 mb-3 rounded-lg shadow-lg">
      {children}
    </div>
  );
}
