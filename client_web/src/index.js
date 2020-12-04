import React from "react";
import ReactDOM from "react-dom";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./tailwind.output.css";

import { ProvideAlert } from "hooks/useAlert";
import { ProvideAuth } from "hooks/useAuth";

const queryCache = new QueryCache();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ProvideAlert>
        <ReactQueryCacheProvider queryCache={queryCache}>
          <ProvideAuth>
            <App />
          </ProvideAuth>
        </ReactQueryCacheProvider>
      </ProvideAlert>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
