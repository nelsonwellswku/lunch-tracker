import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import MainNav from './components/MainNav';
import AppContext, { IUser } from './contexts/AppContext';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import PageNotFound from './components/PageNotFound';
import Home from './components/Home';
import { AuthClient } from './api/generated';
import appConfig from './appConfig';

const App = () => {
  const existingUserId = window.localStorage.getItem("appUserId");
  const [user, setUser] = useState<IUser | null>(existingUserId ? { appUserId: parseInt(existingUserId, 10) } : null);

  const login = async (token: string) => {

    const client = new AuthClient(appConfig.BaseUrl);
    const response = await client.signIn({
      externalToken: token,
    });

    if (response && response.appUserId) {
      window.localStorage.setItem("appUserId", response.appUserId.toString());
      setUser({ appUserId: response.appUserId });
    }
  };

  const logout = () => {
    const client = new AuthClient(appConfig.BaseUrl);
    client.signOut();
    window.localStorage.removeItem("appUserId");
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
