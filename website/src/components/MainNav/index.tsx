import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavLink from 'react-bootstrap/NavLink';
import Container from 'react-bootstrap/Container';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import AppContext from '../../AppContext';

const handleFailure = (error: any) => console.log(error);

interface IPropsType {
  login: (token: string) => void,
  logout: () => void,
  user: { authToken: string } | null,
};

const MainNav = (props: IPropsType) => {

  const handleSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ((response as GoogleLoginResponse).getAuthResponse) {
      const token = (response as GoogleLoginResponse).getAuthResponse().id_token;
      props.login(token);
    }
  };

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">Lunch Tracker</Navbar.Brand>
        {props.user ? <NavLink onClick={props.logout}>Log Out</NavLink> :
          <GoogleLogin
            clientId={'214419819681-puljv1g8q8hob1b7oemi5uiacilo3165.apps.googleusercontent.com'}
            onSuccess={handleSuccess}
            onFailure={handleFailure}
          />}
      </Container>
    </Navbar>
  );
};

export default () => (
  <AppContext.Consumer>
    {value => <MainNav {...value} />}
  </AppContext.Consumer>
);
