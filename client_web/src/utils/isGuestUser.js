import {
  getValueFromSessionStorage,
  saveValueToSessionStorage,
} from "./sessionStorage";

const GUEST_SESSION_KEY = "guest";

export const getIsGuestUser = () =>
  getValueFromSessionStorage(GUEST_SESSION_KEY, false);

export const setGuestUser = {
  true: () => saveValueToSessionStorage(GUEST_SESSION_KEY, true),
  false: () => saveValueToSessionStorage(GUEST_SESSION_KEY, false),
};
