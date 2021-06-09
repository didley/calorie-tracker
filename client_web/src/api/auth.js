import { client } from "./client";
import { guestUser } from "utils/isGuestUser";
import { guestsInitialDetails } from "./initialGuestData";

const getUser = () => {
  if (guestUser.get()) {
    return {
      user: guestUser.get(),
    };
  }

  return client.get("/user");
};

const loginGuest = () => {
  guestUser.init();

  return {
    user: guestsInitialDetails,
    msg: `Welcome ${guestsInitialDetails.name}`,
  };
};

const loginUser = (email, password) => {
  guestUser.clear();

  return client.post("/user/login", {
    body: { email, password },
  });
};

const registerUser = (body) => {
  guestUser.clear();

  return client.post("/user/register", { body });
};

const logoutUser = () => {
  guestUser.clear();

  return client.post("/user/logout");
};

const updateUser = (changedUserDetails) => {
  if (guestUser.get()) {
    return guestUser.set(changedUserDetails);
  }

  return client.put("/user", {
    body: changedUserDetails,
  });
};

export const auth = {
  getUser,
  loginGuest,
  loginUser,
  registerUser,
  logoutUser,
  updateUser,
};
