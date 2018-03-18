import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import './App.css';


const App = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#home">Lunch Tracker</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav pullRight>
      <NavItem href="#authentication/signin">
        Sign In
      </NavItem>
      <NavItem href="#authentication/register">
        Register
      </NavItem>
    </Nav>
  </Navbar>
);

export default App;
