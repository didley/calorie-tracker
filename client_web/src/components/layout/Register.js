import React, { useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";

import { useAlert } from "hooks/useAlert";
import { useAuth } from "hooks/useAuth";

export default function Register() {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();
  const { setIsLoading, setTimedAlert } = useAlert();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const [redirectTo, setRedirectTo] = useState(null);

  const { from } = location.state || { from: { pathname: "/" } };

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
    setIsLoading(true);
    try {
      const req = await auth.register(email, password, name);
      setTimedAlert("alert", `Welcome ${req.name}`);
      location.state ? history.replace(from) : setRedirectTo("/diary");
    } catch (err) {
      if (err.response.status === 401) {
        // TODO: working on
        setTimedAlert("error", `${err.msg} Incorrect credentials`);
      } else {
        setTimedAlert("error", `Login request error ${err}`);
      }
    }
  };

  if (redirectTo) return <Redirect to={{ pathname: redirectTo }} />;

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
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
        <label>
          Confirm password:
          <input
            type="password"
            value={confirmedPassword}
            required
            onChange={(e) => setConfirmedPassword(e.target.value)}
          />
        </label>
        <br />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}
