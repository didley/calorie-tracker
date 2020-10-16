import React from "react";
import { Switch, Route } from "react-router-dom";
import { Security, LoginCallback, SecureRoute } from "@okta/okta-react";

import AddFoods from "./components/addFoods";
import Diary from "./components/diary";
import NavBar from "./components/layout/NavBar";
import Home from "./components/layout/Home";

const OKTA_ORG_URL = process.env.REACT_APP_OKTA_ORG_URL;
const OKTA_CLIENT_ID = process.env.REACT_APP_OKTA_CLIENT_ID;
const OKTA_CALLBACK_PATH = "/login/callback";

const oktaConfig = {
  clientId: OKTA_CLIENT_ID,
  issuer: `https://${OKTA_ORG_URL}/oauth2/default`,
  redirectUri: "http://localhost:3000/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
};

export default function App() {
  return (
    <div className="bg-orange-100 min-h-screen">
      <NavBar OKTA_CALLBACK_PATH={OKTA_CALLBACK_PATH} />
      <div>
        <Security {...oktaConfig}>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
            <Route path={OKTA_CALLBACK_PATH}>
              <LoginCallback />
            </Route>
            <SecureRoute path="/diary">
              <Diary />
            </SecureRoute>
            <SecureRoute path="/addFoods">
              <AddFoods />
            </SecureRoute>
          </Switch>
        </Security>
      </div>
    </div>
  );
}
