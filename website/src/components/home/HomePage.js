import React from 'react';
import RegistrationCallToAction from './RegistrationCallToAction';
import LunchForm from './LunchForm';

const HomePage = ({
  user,
  addFetch,
  removeFetch,
  logOut,
}) => {
  const isLoggedIn = !!user;
  const promptForUserAction = isLoggedIn ?
    (<LunchForm
      addFetch={addFetch}
      removeFetch={removeFetch}
      user={user}
      logOut={logOut}
    />) :
    <RegistrationCallToAction />;

  return (
    <div>
      <h1>Welcome to Lunch Tracker!</h1>
      {promptForUserAction}
    </div>
  );
};

export default HomePage;
