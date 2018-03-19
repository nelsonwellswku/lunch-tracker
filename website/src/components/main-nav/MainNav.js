import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const MainNav = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">Lunch Tracker</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav pullRight>
      {/* <NavItem href="/authentication/signin">
      Sign In
    </NavItem> */}
      <NavItem href="/authentication/register">
        Register
      </NavItem>
    </Nav>
  </Navbar>
);

export default MainNav;
