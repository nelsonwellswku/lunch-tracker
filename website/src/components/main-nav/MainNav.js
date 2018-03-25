import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class MainNav extends Component {
  constructor(props) {
    super();
    this.state = {
      user: null,
    };

    this.getLogButton = this.getLogButton.bind(this);
    this.handleLogout = props.logout;
    this.getUser = props.getUser;
  }

  componentWillMount() {
    this.setState({
      user: this.getUser(),
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

MainNav.propTypes = {
  getUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default MainNav;
