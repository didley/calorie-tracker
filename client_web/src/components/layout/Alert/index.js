import React, { useContext } from "react";
import alertContext from "context/alert/alertContext";

import LoadingSpinner from "components/shared/LoadingSpinner";
import AlertDisplay from "./AlertDisplay";
import ErrorsDisplay from "./ErrorsDisplay";

export default function Alert() {
  const { isLoading, error, alert } = useContext(alertContext);

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      {alert && <AlertDisplay alert={alert} />}
      {error && <ErrorsDisplay error={error} />}
    </div>
  );
}
