import React from "react";

import { useAlert } from "hooks/useAlert";

import LoadingSpinner from "components/shared/LoadingSpinner";
import AlertDisplay from "./AlertDisplay";
import ErrorsDisplay from "./ErrorsDisplay";

export default function Alert() {
  const { isLoading, error, alert } = useAlert();

  return (
    <div>
      {error && <ErrorsDisplay error={error} />}
      {alert && <AlertDisplay alert={alert} />}
      {isLoading && <LoadingSpinner />}
    </div>
  );
}
