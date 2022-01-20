import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./tailwind.output.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ProvideAlert } from "hooks/useAlert";
import { ProvideAuth } from "hooks/useAuth";
import { BrowserRouter as Router } from "react-router-dom";

if (
  process.env.NODE_ENV === "development" &&
  process.env.REACT_APP_USE_MSW === "true"
) {
  const { worker } = require("./mocks/browser");
  worker.start();
}

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProvideAlert>
        <ProvideAuth>
          <Router>
            <App />
            <ReactQueryDevtools />
          </Router>
        </ProvideAuth>
      </ProvideAlert>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
