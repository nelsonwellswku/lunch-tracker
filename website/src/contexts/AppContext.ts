import React from "react";

export interface IAppContext {
  login: (token: string) => void,
  logout: () => void,
  user: IUser | null,
}

export interface IUser {
  appUserId: number,
}

const AppContext = React.createContext<IAppContext>({
  login: (token: string) => { },
  logout: () => { },
  user: null,
});

export default AppContext;
