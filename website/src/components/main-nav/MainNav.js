import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const MainNav = (props) => {
  const logInOrLogOut = props.isLoggedIn ?
    (<NavItem href="/authentication/logout">
      Log Out
     </NavItem>)
    : (<NavItem href="/authentication/login">
      Log In
       </NavItem>);

  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">Lunch Tracker</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav pullRight>
        {logInOrLogOut}
        <NavItem href="/authentication/register">
          Register
        </NavItem>
      </Nav>
    </Navbar>);
};

MainNav.propTypes = { isLoggedIn: PropTypes.bool.isRequired };

export default MainNav;
