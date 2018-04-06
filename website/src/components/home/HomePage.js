import React from 'react';
import RegistrationCallToAction from './RegistrationCallToAction';
import LunchForm from './LunchForm';

const HomePage = (props) => {
  const isLoggedIn = !!props.user;
  const promptForUserAction = isLoggedIn ?
    <LunchForm /> :
    <RegistrationCallToAction />;

  return (
    <div>
      <h1>Welcome to Lunch Tracker!</h1>
      {promptForUserAction}
    </div>
  );
};

export default HomePage;
