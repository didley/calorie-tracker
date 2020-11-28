import React, { useState, useContext, createContext } from "react";

import axios from "axios";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [checkingLoggedIn, setCheckingLoggedIn] = useState(true);

  const isUserLoggedIn = async () => {
    setCheckingLoggedIn(true);
    const req = await axios.get("/api/auth/user");
    const loggedInUser = req.data.user;
    if (loggedInUser !== null) {
      setUser(loggedInUser);
      setCheckingLoggedIn(false);
    } else {
      setUser(null);
      setCheckingLoggedIn(false);
    }
  };

  const login = async (email, password) => {
    try {
      const req = await axios.post("/api/auth/login", { email, password });
      setUser(req.data.user);
      return req.data.user;
    } catch (err) {
      throw err;
    }
  };

  const register = (email, password, name) => {};

  const logout = async () => {
    try {
      const req = await axios.post("/api/auth/logout");
      if (req.status === 200) setUser(null);
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
