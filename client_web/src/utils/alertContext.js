import React, { createContext, useReducer, useContext } from "react";

const AlertStateContext = createContext();
const AlertDispatchContext = createContext();

const inisialState = { alert: "", errors: [], isLoading: false };

function alertReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING": {
      return { isLoading: true };
    }
    case "SET_NOT_LOADING": {
      return { isLoading: true };
    }
    case "SET_ALERT": {
      return { alert: action.payload };
    }
    case "REMOVE_ALERT": {
      return { alert: "" };
    }
    case "SET_ERROR": {
      return { error: action.payload };
    }
    case "REMOVE_ERROR": {
      return { error: "" };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AlertProvider({ children }) {
  const [state, dispatch] = useReducer(alertReducer, {});
  return (
    <AlertStateContext.Provider value={state}>
      <AlertDispatchContext.Provider value={dispatch}>
        {children}
      </AlertDispatchContext.Provider>
    </AlertStateContext.Provider>
  );
}

function useAlertState() {
  const context = useContext(AlertStateContext);

  if (context === undefined) {
    throw new Error("useAlertState must be used within a CountProvider");
  }

  return context;
}

function useAlertDispatch() {
  const context = useContext(AlertDispatchContext);

  if (context === undefined) {
    throw new Error("useAlertDispatch must be used within a CountProvider");
  }

  return context;
}

export { AlertProvider, useAlertState, useAlertDispatch };
