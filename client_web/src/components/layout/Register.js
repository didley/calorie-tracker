import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Page, Container, Button } from "components/shared/styling";

import { useAlert } from "hooks/useAlert";
import { useAuth } from "hooks/useAuth";

export default function Register() {
  const auth = useAuth();
  const { setTimedAlert } = useAlert();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const [redirectTo, setRedirectTo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmedPassword) {
      setPassword("");
      setConfirmedPassword("");
      return setTimedAlert(
        "alert",
        "Confirmed password does not match, try again"
      );
    }

    try {
      await auth.register(email, password, name);
      setRedirectTo("/diary");
    } catch (err) {
      return;
    }
  };

  if (redirectTo) return <Redirect to={{ pathname: redirectTo }} />;

  return (
    <Page>
      <Container>
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <label htmlFor="firstName">
            Your first name:
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br />
          <label htmlFor="email">
            Email:
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label htmlFor="password">
            Password:
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <label htmlFor="confirmationPassword">
            Confirm password:
            <input
              type="password"
              value={confirmedPassword}
              required
              onChange={(e) => setConfirmedPassword(e.target.value)}
            />
          </label>
          <br />
          <Button>Register</Button>
        </form>
      </Container>
    </Page>
  );
}
