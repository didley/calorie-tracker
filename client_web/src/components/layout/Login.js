import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Page, Container, Button } from "components/shared/styling";

import { useAuth } from "hooks/useAuth";

export default function Login() {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { from } = location.state || { from: { pathname: "/diary" } };

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
    <Page>
      <Container>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <label htmlFor="email">
            Email
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </label>
          <br />
          <label htmlFor="password">
            Password
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </label>
          <br />
          <Button type="submit">Login</Button>
        </form>
      </Container>
    </Page>
  );
}
