import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import MainNav from './components/MainNav';
import AppContext, { IUser } from './AppContext';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import PageNotFound from './components/PageNotFound';
import Home from './components/Home';
import { UserClient } from './api/generated';
import AppConfig from './appConfig';
import appConfig from './appConfig';

const AUTH_TOKEN = 'authToken';

const App = () => {
  const token = window.localStorage.getItem(AUTH_TOKEN);
  const [user, setUser] = useState<IUser | null>(token ? { authToken: token } : null);

  const login = async (token: string) => {

    const client = new UserClient(appConfig.BaseUrl);
    const response = await client.getJwt({
      externalToken: token,
    });
    if (response == null || !response.token) {
      return;
    }

    window.localStorage.setItem(AUTH_TOKEN, response.token);
    setUser({
      authToken: token
    });
  };

  const logout = () => {
    window.localStorage.removeItem(AUTH_TOKEN);
    setUser(null);
  }

  return (
    <AppContext.Provider value={{
      login,
      logout,
      user,
    }}>

      <MainNav></MainNav>

      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/sign-in'>
          <SignIn />
        </Route>
        <Route exact path='/sign-out'>
          <SignOut />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>


    </AppContext.Provider>
  );
}

export default App;
