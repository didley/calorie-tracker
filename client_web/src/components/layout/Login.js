import React, { useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";

import { useAlert } from "hooks/useAlert";
import { useAuth } from "hooks/useAuth";

export default function Login() {
  const auth = useAuth();
  const { setIsLoading, setTimedAlert } = useAlert();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectTo, setRedirectTo] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const req = await auth.login(email, password);
      setTimedAlert("alert", `Welcome ${req.name}`);
      setRedirectTo("/diary");
    } catch (err) {
      if (err.response.status === 401) {
        setTimedAlert("alert", "Incorrect credentials");
      } else {
        setTimedAlert("error", `Login request error ${err}`);
      }
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
