import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle as fasFaCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle as farFaCircle } from "@fortawesome/free-regular-svg-icons";

export default function SelectBtn({ hovered, selected }) {
  if (selected) {
    return <FontAwesomeIcon className="text-blue-500" icon={fasFaCircle} />;
  } else if (hovered) {
    return <FontAwesomeIcon className="text-gray-600" icon={fasFaCircle} />;
  } else {
    return <FontAwesomeIcon className="text-gray-700" icon={farFaCircle} />;
  }
}
