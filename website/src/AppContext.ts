import React from "react";

interface IAppContextValues {
  login: (token: string) => void,
  logout: () => void,
  user: { authToken: string } | null,
}

const AppContext = React.createContext<IAppContextValues>({
  login: (token: string) => { },
  logout: () => { },
  user: null,
});

export default AppContext;
