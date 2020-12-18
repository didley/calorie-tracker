import React, { useState, useContext, createContext } from "react";

import { useAlert } from "hooks/useAlert";

import axios from "axios";
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

  const isUserLoggedIn = async () => {
    setCheckingLoggedIn(true);
    const req = await client.get("/auth/user");
    console.log("useAuth >>>>>>", req);
    const loggedInUser = req.user;
    if (loggedInUser !== null) {
      setUser(loggedInUser);
      setCheckingLoggedIn(false);
    } else {
      setUser(null);
      setCheckingLoggedIn(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const req = await axios.post("/api/auth/login", { email, password });
      setUser(req.data.user);
      setTimedAlert("alert", `${req.data.msg}`);
    } catch (err) {
      console.log("err", err.message);
      setTimedAlert("error", err.msg);
    }
  };

  const register = async (email, password, name) => {
    try {
      const req = await axios.post("/api/auth/register", {
        email,
        password,
        name,
      });
      setUser(req.data.user);
      setTimedAlert("alert", `${req.data.msg}`);
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      const req = await axios.post("/api/auth/logout");
      if (req.status === 200) {
        setUser(null);
        clearAlerts();
      }
    } catch (err) {
      throw err;
    }
  };

  return {
    checkingLoggedIn,
    isUserLoggedIn,
    user,
    login,
    register,
    logout,
  };
}
