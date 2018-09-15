import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const getLogButton = user => (user ?
  <NavItem href="/authentication/logout">
    Log Out
  </NavItem> :
  <NavItem href="/authentication/login">
    Log In
  </NavItem>);

const getRegisterButton = user => (!user ?
  <NavItem href="/authentication/register">
    Register
  </NavItem>
  : null);

const MainNav = (props) => {
  const { fetching, user } = props;
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">Lunch Tracker</a>
        </Navbar.Brand>
      </Navbar.Header>
      {Object.keys(fetching).length ? <Nav pullLeft><NavItem>Loading...</NavItem></Nav> : null}
      <Nav pullRight>
        {getLogButton(user)}
        {getRegisterButton(user)}
      </Nav>
    </Navbar>);
};

export default MainNav;
