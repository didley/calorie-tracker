import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./tailwind.output.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ProvideAlert } from "hooks/useAlert";
import { ProvideAuth } from "hooks/useAuth";
import { BrowserRouter as Router } from "react-router-dom";

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
