import React, { useState, useContext } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import axios from "axios";

import alertContext from "context/alert/alertContext";
import authContext from "context/auth/authContext";

export default function Login() {
  const { setIsLoading, setTimedAlert } = useContext(alertContext);
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(
    authContext
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectTo, setRedirectTO] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      setUser(res.data.user);
      setIsAuthenticated(true);
      setIsLoading(false);
      setTimedAlert("alert", "Login Success!");
      setRedirectTO("/diary");
    } catch (err) {
      if (err.response.status === 401) {
        setTimedAlert("alert", "Incorrect credentials");
      } else {
        setTimedAlert("error", `Login request error ${err}`);
      }
      setIsLoading(false);
    }
  }

  if (redirectTo) return <Redirect to={{ pathname: redirectTo }} />;

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
