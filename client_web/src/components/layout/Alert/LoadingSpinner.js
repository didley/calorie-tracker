import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export default function LoadingSpinner() {
  return (
    <div className="bg-white">
      <h1 className="text-center text-gray-900">
        <FontAwesomeIcon
          className="animate-spin text-gray-900"
          icon={faCircleNotch}
          size="sm"
        />
      </h1>
    </div>
  );
}
