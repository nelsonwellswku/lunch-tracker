import React from 'react';
import { Redirect } from 'react-router-dom';

const LogOutPage = (props) => {
  props.logOut();
  return <Redirect to="/" />;
};

export default LogOutPage;
