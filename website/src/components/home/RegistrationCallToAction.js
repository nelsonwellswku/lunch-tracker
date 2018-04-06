import React from 'react';

const RegistrationCallToAction = () => {
  const registrationUrl = '/authentication/register';
  const loginUrl = '/authentication/login';
  return (
    <p>
      Get started by <a href={registrationUrl}>registering</a> or <a href={loginUrl}>logging in.</a>
    </p>
  );
};

export default RegistrationCallToAction;
