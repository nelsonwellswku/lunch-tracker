import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './App.css';
import Home from './components/home/Home';
import MainNav from './components/main-nav/MainNav';
import RegistrationPage from './components/register/RegistrationPage';
import LogInPage from './components/log-in/LogInPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };

    this.logIn = this.logIn.bind(this);
    this.logout = this.logout.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  componentWillMount() {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      const user = jwtDecode(authToken);
      this.setState({
        user,
      });
    }
  }

  getUser() {
    return this.state.user;
  }

  logout() {
    localStorage.removeItem('authToken');
    this.setState({
      user: null,
    });
  }

  logIn(authToken) {
    localStorage.setItem('authToken', authToken);
    this.setState({
      user: jwtDecode(authToken),
    });
  }

  render() {
    return (
      <div>
        <MainNav user={this.state.user} logout={this.logout} />

        <Router>
          <Grid>
            <Route exact path="/" component={Home} />
            <Route path="/authentication/login" render={() => <LogInPage logIn={this.logIn} />} />
            <Route path="/authentication/register" component={RegistrationPage} />
          </Grid>
        </Router>
      </div>
    );
  }
}


export default App;
