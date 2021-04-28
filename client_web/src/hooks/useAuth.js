import React, { useState, useContext, createContext } from "react";

import { useAlert } from "hooks/useAlert";
import { useSessionStorage } from "hooks/useSessionStorage";

import { client } from "api/client";

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

  const isUserLoggedIn = async () => {
    setCheckingLoggedIn(true);
    const data = await client.get("/user");
    const loggedInUser = data.user;
    if (loggedInUser !== null) {
      setUser(loggedInUser);
      clearSession();
      setCheckingLoggedIn(false);
    } else {
      setUser(null);
      if (guest) {
        setUser({ isGuest: true });
      }
      setCheckingLoggedIn(false);
    }
  };

  const loginGuest = async () => {
    setIsLoading(true);
    try {
      setGuest(true);
      setTimedAlert("alert", "Welcome Guest");
    } catch (err) {
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
    loginGuest,
    login,
    register,
    logout,
    updateUser,
  };
}
