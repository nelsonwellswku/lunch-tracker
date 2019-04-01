import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import AppContext from '../../contexts/AppContext';
import { NavLink } from 'react-router-dom';

const MainNav = () => {

  const { user } = useContext(AppContext);

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

export default MainNav;
