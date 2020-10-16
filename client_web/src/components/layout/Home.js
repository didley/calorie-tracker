import React from "react";
import { useOktaAuth } from "@okta/okta-react";

export default function Home() {
  const { authState, authService } = useOktaAuth();
  const login = () => authService.login("/diary");

  if (authState.isPending) {
    return <div>Loading authentication...</div>;
  } else if (!authState.isAuthenticated) {
    return (
      <div>
        <h1>home homie</h1>
        <a onClick={login}>Login</a>
      </div>
    );
  }
}
