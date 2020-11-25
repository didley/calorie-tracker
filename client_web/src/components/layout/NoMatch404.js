import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NoMatch404() {
  let location = useLocation();
  return (
    <div>
      <h2>404 Error, route not found.</h2>
      <p>
        Route <code>{location.pathname}</code>
      </p>
      <Link to="/">
        <button>Return Home</button>
      </Link>
    </div>
  );
}
