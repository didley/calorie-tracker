import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default function Login({
  setIsLoading,
  setError,
  setUser,
  setLoggedIn,
  setTimedAlert,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectTo, setRedirectTO] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      setUser(res.data.user);
      setLoggedIn(true);
      setIsLoading(false);
      setTimedAlert("Login Success!");
      setRedirectTO("/diary");
    } catch (err) {
      if (err.response.status === 401) {
        setError("Incorrect credentials");
      } else {
        setError(`Login request error ${err}`);
      }
      setIsLoading(false);
    }
  }

  return redirectTo ? (
    <Redirect to={{ pathname: redirectTo }} />
  ) : (
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
