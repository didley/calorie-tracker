import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { useAuth } from "hooks/useAuth";

export default function Login() {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { from } = location.state || { from: { pathname: "/" } };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await auth.login(email, password);
      history.replace(from);
    } catch (err) {
      return;
    }
  }

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
