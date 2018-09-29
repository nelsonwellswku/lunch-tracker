import React, { Fragment } from 'react';

const RegistrationCallToAction = () => {
  const registrationUrl = '/authentication/register';
  const loginUrl = '/authentication/login';
  return (
    <Fragment>
      <h1>Welcome to Lunch Tracker!</h1>
      <p>
        Get started
        by <a href={registrationUrl}>registering</a> or <a href={loginUrl}>logging in.</a>
      </p>
    </Fragment>
  );
};

export default RegistrationCallToAction;
