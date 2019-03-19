import React, { useState, useEffect } from 'react';
import MainNav from './components/MainNav';
import AppContext from './AppContext';

const App = () => {
  const token = window.sessionStorage.getItem('authToken');
  const [user, setUser] = useState<{ authToken: string } | null>(token ? { authToken: token } : null);

  const login = (token: string) => {
    window.sessionStorage.setItem('authToken', token);
    setUser({
      authToken: token
    })
  };

  const logout = () => {
    window.sessionStorage.removeItem('authToken');
    setUser(null);
  }

  return <AppContext.Provider value={{
    login,
    logout,
    user,
  }}>
    <MainNav></MainNav>
  </AppContext.Provider>
}

export default App;
