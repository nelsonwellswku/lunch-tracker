import React from 'react';
import RegistrationCallToAction from './RegistrationCallToAction';
import LunchMasterDetail from './LunchMasterDetail';

const HomePage = (props) => {
  const {
    user,
    addFetch,
    removeFetch,
    logOut,
  } = props;

  const isLoggedIn = !!user;
  const promptForUserAction = isLoggedIn ?
    (<LunchMasterDetail
      addFetch={addFetch}
      removeFetch={removeFetch}
      user={user}
      logOut={logOut}
    />) :
    <RegistrationCallToAction />;

  return (
    <div>
      {promptForUserAction}
    </div>
  );
};

export default HomePage;
