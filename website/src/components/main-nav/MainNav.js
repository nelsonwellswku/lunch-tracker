import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class MainNav extends Component {
  constructor(props) {
    super();
    this.state = {
      isLoggedIn: props.isLoggedIn,
    };

    this.getLogButton = this.getLogButton.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  getLogButton() {
    return (this.state.isLoggedIn ?
      (<NavItem href="#" onClick={this.handleLogout}>
        Log Out
       </NavItem>)
      : (<NavItem href="/authentication/login">
        Log In
         </NavItem>));
  }

  handleLogout() {
    localStorage.removeItem('authToken');
    this.setState({
      isLoggedIn: false,
    });
  }

  render() {
    const logInOrLogOut = this.getLogButton();
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
  }
}

MainNav.propTypes = { isLoggedIn: PropTypes.bool.isRequired };

export default MainNav;
