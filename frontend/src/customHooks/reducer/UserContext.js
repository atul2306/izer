import { createContext } from "react";
export const UserContext = createContext({
  userDetails: {},

  token: null,
  login: () => {},
  logout: () => {},
});
