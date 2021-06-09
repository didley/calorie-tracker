import { useState, useContext, createContext } from "react";

import { useAlert } from "hooks/useAlert";
import { getIsGuestUser } from "utils/isGuestUser";
import { useQueryClient } from "react-query";

import { auth } from "api/auth";

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
  const queryClient = useQueryClient();

  const isGuestUser = getIsGuestUser();

  const isUserLoggedIn = async () => {
    setCheckingLoggedIn(true);
    const { user } = await auth.getUser();
    const loggedInUser = user;
    console.log({ loggedInUser });

    if (loggedInUser !== null) {
      setUser(loggedInUser);
      setCheckingLoggedIn(false);
    } else {
      setUser(null);
      setCheckingLoggedIn(false);
    }
  };

  const loginGuest = async () => {
    setCheckingLoggedIn(true);
    try {
      const guestLoginRes = auth.loginGuest();
      setUser(guestLoginRes.user);
      setTimedAlert("alert", guestLoginRes.msg);
      setCheckingLoggedIn(false);
    } catch (err) {
      setCheckingLoggedIn(false);
      setTimedAlert("error", err);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const data = await auth.loginUser(email, password);
      setUser(data.user);
      setTimedAlert("alert", `${data.msg}`);
    } catch (err) {
      setTimedAlert("error", err);
    }
  };

  const register = async (body) => {
    try {
      const data = await auth.registerUser(body);
      setUser(data.user);
      setTimedAlert("alert", `${data.msg}`);
    } catch (err) {
      setTimedAlert("error", err);
    }
  };

  const logout = async () => {
    try {
      queryClient.invalidateQueries();
      setUser(null);
      clearAlerts();
      await auth.logoutUser();
    } catch (err) {
      setTimedAlert("error", err);
    }
  };

  const updateUser = async (changedUserDetails) => {
    try {
      const updatedUser = await auth.updateUser(changedUserDetails);
      setUser(updatedUser.data);
      setTimedAlert("alert", "Account successfully updated");
    } catch (err) {
      setTimedAlert("error", err);
    }
  };

  return {
    checkingLoggedIn,
    user,
    isGuestUser,
    isUserLoggedIn,
    loginGuest,
    login,
    register,
    logout,
    updateUser,
  };
}
