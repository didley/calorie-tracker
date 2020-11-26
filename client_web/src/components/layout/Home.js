import React from "react";

import alertContext from "context/alert/alertContext";

export default function Home() {
  const { isLoading, setIsLoading, setTimedAlert } = React.useContext(
    alertContext
  );

  function handleLoadingClick() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  function handleAlertClick() {
    setTimedAlert("alert", "hi", 1000);
  }

  return (
    <div>
      <h1>home homie</h1>
      <button onClick={handleLoadingClick}>
        {isLoading ? "loading..." : "click me"}
      </button>
      <br />
      <button onClick={handleAlertClick}>Make alert button</button>
    </div>
  );
}
