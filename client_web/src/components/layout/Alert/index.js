import React from "react";

import { useAlert } from "hooks/useAlert";

import LoadingSpinner from "components/shared/LoadingSpinner";
import AlertDisplay from "./AlertDisplay";
import ErrorsDisplay from "./ErrorsDisplay";

export default function Alert() {
  const { isLoading, error, alert } = useAlert();

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      {alert && <AlertDisplay alert={alert} />}
      {error && <ErrorsDisplay error={error} />}
    </div>
  );
}
