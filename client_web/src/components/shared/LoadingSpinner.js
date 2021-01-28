import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export default function LoadingSpinner({ white, size }) {
  return (
    <div className={`text-center ${!white && "bg-white"}`}>
      <FontAwesomeIcon
        className={`animate-spin ${white ? "text-white" : "text-gray-800"}`}
        icon={faCircleNotch}
        size={size ? size : "xs"}
      />
    </div>
  );
}
