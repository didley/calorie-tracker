import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export default function LoadingSpinner({ white }) {
  return (
    <div className={!white && "bg-white"}>
      <h1 className={`text-center ${white ? "text-white" : "text-gray-900"}`}>
        <FontAwesomeIcon
          className={`animate-spin`}
          icon={faCircleNotch}
          size="sm"
        />
      </h1>
    </div>
  );
}
