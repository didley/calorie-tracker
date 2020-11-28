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
      console.log({ loggedInUser });
      setUser(loggedInUser);
      setCheckingLoggedIn(false);
    } else {
      setUser(null);
      setCheckingLoggedIn(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      setUser(res.data.user);
      return res.data.user;
    } catch (err) {
      throw err;
    }
  };

  const register = (email, password, name) => {};

  const logout = () => {};

  return {
    checkingLoggedIn,
    isUserLoggedIn,
    user,
    login,
    register,
    logout,
  };
}
