import { useState, useContext, createContext } from "react";

import { useAlert } from "hooks/useAlert";
import { clearSessionStorage } from "utils/sessionStorage";
import { isGuestUser, setGuestUser } from "utils/isGuestUser";

import { client } from "api/client";

import { defaultGuest } from "../utils/defaultSessionData";

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

  const isUserLoggedIn = async () => {
    const data = await client.get("/user");
    const loggedInUser = data.user;

    setCheckingLoggedIn(true);
    if (loggedInUser !== null) {
      clearSessionStorage();
      setUser(loggedInUser);
      setCheckingLoggedIn(false);
    } else if (isGuestUser) {
      setUser(defaultGuest);
      setCheckingLoggedIn(false);
    } else {
      setUser(null);
      setGuestUser.false();
      setCheckingLoggedIn(false);
    }
  };

  const loginGuest = async () => {
    setCheckingLoggedIn(true);
    try {
      setGuestUser.true();
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
      clearSessionStorage();
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
