import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "components/shared/styling";

import { useAlert } from "hooks/useAlert";
import { useAuth } from "hooks/useAuth";
import CountryDropdown from "components/shared/CountryDropdown";

export default function EmailRegisterForm() {
  const auth = useAuth();
  const { setTimedAlert } = useAlert();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [country, setCountry] = useState("");

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
      await auth.register({ email, password, name, country });
      setRedirectTo("/diary");
    } catch (err) {
      return;
    }
  };

  if (redirectTo) return <Redirect to={{ pathname: redirectTo }} />;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">
          Your first name
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full"
          />
        </label>
        <br />
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
        <label htmlFor="confirmationPassword">
          Confirm password
          <input
            type="password"
            value={confirmedPassword}
            required
            onChange={(e) => setConfirmedPassword(e.target.value)}
            className="w-full"
          />
        </label>
        <br />
        <label htmlFor="country">
          Country
          <CountryDropdown
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
            className="w-full"
          />
        </label>
        <br />
        <Button type="submit">Register</Button>
      </form>
    </>
  );
}
