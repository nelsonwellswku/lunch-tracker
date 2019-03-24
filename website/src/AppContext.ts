import React from "react";

export interface IAppContext {
  login: (token: string) => void,
  logout: () => void,
  user: (IUser & IJwtPayload) | null,
}

export interface IJwtPayload {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  nbf: number;
  iat: number;
  appUserId: number;
  firstName: string;
  lastName: string;
}

export interface IUser {
  authToken: string,
}

const AppContext = React.createContext<IAppContext>({
  login: (token: string) => { },
  logout: () => { },
  user: null,
});

export default AppContext;
