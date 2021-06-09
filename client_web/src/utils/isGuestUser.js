import {
  getValueFromSessionStorage,
  saveValueToSessionStorage,
  clearSessionStorage,
} from "./sessionStorage";
import { guestsInitialDetails } from "api/initialGuestData";

const GUEST_KEY = "guest";

export const getIsGuestUser = () => {
  const guestUser = getValueFromSessionStorage(GUEST_KEY, null);
  return guestUser ? true : false;
};

export const setGuestUser = {
  true: () => saveValueToSessionStorage(GUEST_KEY, true),
  false: () => saveValueToSessionStorage(GUEST_KEY, false),
};

export const guestUser = {
  get: () => getValueFromSessionStorage(GUEST_KEY),
  set: (guestDetails) => saveValueToSessionStorage(GUEST_KEY, guestDetails),
  init: () => saveValueToSessionStorage(GUEST_KEY, guestsInitialDetails),
  clear: () => clearSessionStorage(),
};
