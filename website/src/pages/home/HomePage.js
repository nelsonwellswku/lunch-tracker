import React from 'react';
import RegistrationCallToAction from './RegistrationCallToAction';
import LunchMasterDetail from './LunchMasterDetail';

const HomePage = (props) => {
  const {
    user,
  } = props;

  const isLoggedIn = !!user;
  const promptForUserAction = isLoggedIn ?
    (<LunchMasterDetail />) :
    <RegistrationCallToAction />;

  return (
    <div>
      {promptForUserAction}
    </div>
  );
};

export default HomePage;
