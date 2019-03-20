import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import AppContext, { IAppContext } from '../../AppContext';
import { Link, NavLink } from 'react-router-dom';

const MainNav = ({ user }: IAppContext) => {

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">Lunch Tracker</Navbar.Brand>
        {
          user ? <NavLink to='/sign-out'>Sign Out</NavLink> : <NavLink to='sign-in'>Sign In</NavLink>
        }
      </Container>
    </Navbar>
  );
};

export default () => (
  <AppContext.Consumer>
    {value => <MainNav {...value} />}
  </AppContext.Consumer>
);
