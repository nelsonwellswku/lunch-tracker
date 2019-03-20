import React from 'react';
import AppContext, { IAppContext } from '../../AppContext';
import { Redirect } from 'react-router';

const SignOut = ({ logout }: IAppContext) => {
  logout();
  return <Redirect to='/' />
};

export default () => (
  <AppContext.Consumer>
    {values => <SignOut {...values} />}
  </AppContext.Consumer>
);
