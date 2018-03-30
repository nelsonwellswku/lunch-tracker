import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class MainNav extends Component {
  constructor(props) {
    super(props);

    this.getLogButton = this.getLogButton.bind(this);
  }

  getLogButton() {
    return (this.props.user ?
      (<NavItem href="/authentication/logout">
        Log Out
       </NavItem>)
      : (<NavItem href="/authentication/login">
        Log In
         </NavItem>));
  }

  getRegisterButton() {
    return (!this.props.user) ?
      <NavItem href="/authentication/register">
        Register
      </NavItem>
      : null;
  }

  render() {
    const logInOrLogOut = this.getLogButton();
    const getRegisterButton = this.getRegisterButton();
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Lunch Tracker</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          {logInOrLogOut}
          {getRegisterButton}
        </Nav>
      </Navbar>);
  }
}

export default MainNav;
