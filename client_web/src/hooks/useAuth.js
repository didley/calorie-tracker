import React, { useState, useContext, createContext } from "react";

import { useAlert } from "hooks/useAlert";

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
    const data = await client.get("/user");
    const loggedInUser = data.user;
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
      const data = await client.post("/user/login", {
        body: { email, password },
      });
      setUser(data.user);
      setTimedAlert("alert", `${data.msg}`);
    } catch (err) {
      console.log("err", err.message);
      setTimedAlert("error", err.msg);
    }
  };

  const register = async (email, password, name) => {
    try {
      const data = await client.post("/user/register", {
        body: {
          email,
          password,
          name,
        },
      });
      setUser(data.user);
      setTimedAlert("alert", `${data.msg}`);
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await client.post("/user/logout");
      setUser(null);
      clearAlerts();
    } catch (err) {
      throw err;
    }
  };

  const updateUser = async (changedUserDetails) => {
    try {
      const updatedUser = await client.put("/user", {
        body: { changedUserDetails },
      });
      setUser(updatedUser.data);
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
    updateUser,
  };
}
