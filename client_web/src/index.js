import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./tailwind.output.css";

import { ProvideAlert } from "hooks/useAlert";
import { ProvideAuth } from "hooks/useAuth";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ProvideAlert>
        <ProvideAuth>
          <App />
        </ProvideAuth>
      </ProvideAlert>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
