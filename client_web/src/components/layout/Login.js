import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Page, Container, Button } from "components/shared/styling";
import LoginGuestBtn from "components/shared/LoginGuestBtn";

import { useAuth } from "hooks/useAuth";
import LineWithText from "./Register/LineWithText";

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
      <Container className="p-5">
        <form onSubmit={handleSubmit}>
          <h1 className="mb-10">
            Login <hr />
          </h1>
          <div className="flex justify-center pb-4">
            <LoginGuestBtn className="bg-gradient-to-r from-teal-300 to-blue-600 hover:from-pink-400 hover:to-orange-400 px-8" />
          </div>
          <LineWithText width="60%" text="Or" />
          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
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
              id="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </label>
          <br />
          <div className="flex justify-end">
            <Button type="submit">Login</Button>
          </div>
        </form>
      </Container>
    </Page>
  );
}
