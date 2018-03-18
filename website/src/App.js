import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';


const Home = () => (<h1>Home Component</h1>);
const SignIn = () => (<h1>Sign In Component</h1>);
const Register = () => (<h1>Register Component</h1>);

const App = () => (
  <Router>
    <div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Lunch Tracker</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem href="/authentication/signin">
            Sign In
          </NavItem>
          <NavItem href="/authentication/register">
            Register
          </NavItem>
        </Nav>
      </Navbar>

      <Route exact path="/" component={Home} />
      <Route path="/authentication/signin" component={SignIn} />
      <Route path="/authentication/register" component={Register} />
    </div>
  </Router>
);

export default App;
