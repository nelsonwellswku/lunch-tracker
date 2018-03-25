import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class MainNav extends Component {
  constructor(props) {
    super();
    this.state = {
      user: props.user,
    };

    this.getLogButton = this.getLogButton.bind(this);
    this.handleLogout = props.logout;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.user,
    });
  }

  getLogButton() {
    return (this.state.user ?
      (<NavItem href="#" onClick={this.handleLogout}>
        Log Out
       </NavItem>)
      : (<NavItem href="/authentication/login">
        Log In
         </NavItem>));
  }

  getRegisterButton() {
    return (!this.state.user) ?
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
