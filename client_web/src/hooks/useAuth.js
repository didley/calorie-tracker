import React, { useState, useContext, createContext } from "react";

import { useAlert } from "hooks/useAlert";
import { useSessionStorage } from "hooks/useSessionStorage";

import { client } from "api/client";

import { defaultGuest } from "./defaultSessionData";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const { setIsLoading, setTimedAlert, clearAlerts } = useAlert();
  const [user, setUser] = useState(null);
  const [checkingLoggedIn, setCheckingLoggedIn] = useState(true);
  const [guest, setGuest, clearSession] = useSessionStorage("guest", false);

  const isGuestUser = user?.role === "guest" ? true : false;

  const isUserLoggedIn = async () => {
    const data = await client.get("/user");
    const loggedInUser = data.user;

    setCheckingLoggedIn(true);
    if (loggedInUser !== null) {
      clearSession();
      setUser(loggedInUser);
      setCheckingLoggedIn(false);
    } else if (guest) {
      setUser(defaultGuest);
      setCheckingLoggedIn(false);
    } else {
      setUser(null);
      setGuest(false);
      setCheckingLoggedIn(false);
    }
  };

  const loginGuest = async () => {
    setCheckingLoggedIn(true);
    try {
      setGuest(true);
      setUser(defaultGuest);
      setTimedAlert("alert", "Welcome Guest");
      setCheckingLoggedIn(false);
    } catch (err) {
      setCheckingLoggedIn(false);
      setTimedAlert("error", err);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const data = await client.post("/user/login", {
        body: { email, password },
      });
      setUser(data.user);
      setTimedAlert("alert", `${data.msg}`);
    } catch (err) {
      setTimedAlert("error", err);
    }
  };

  const register = async (body) => {
    try {
      const data = await client.post("/user/register", { body });
      setUser(data.user);
      setTimedAlert("alert", `${data.msg}`);
    } catch (err) {
      setTimedAlert("error", err);
    }
  };

  const logout = async () => {
    try {
      await client.post("/user/logout");
      setUser(null);
      clearSession();
      clearAlerts();
    } catch (err) {
      setTimedAlert("error", err);
    }
  };

  const updateUser = async (changedUserDetails) => {
    try {
      const updatedUser = await client.put("/user", {
        body: changedUserDetails,
      });

      setUser(updatedUser.data);
      setTimedAlert("alert", "Account successfully updated");
    } catch (err) {
      setTimedAlert("error", err);
    }
  };

  return {
    checkingLoggedIn,
    isUserLoggedIn,
    user,
    isGuestUser,
    loginGuest,
    login,
    register,
    logout,
    updateUser,
  };
}
