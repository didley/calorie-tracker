import React from "react";

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>
          Email:
          <input type="text" />
        </label>
        <label>
          Password:
          <input type="text" />
        </label>
      </form>
    </div>
  );
}
