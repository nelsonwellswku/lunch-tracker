import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import './App.css';
import HomePage from './components/home/HomePage';
import MainNav from './components/main-nav/MainNav';
import RegistrationPage from './components/register/RegistrationPage';
import LogInPage from './components/log-in/LogInPage';
import LogOutPage from './components/log-out/LogOutPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };

    this.homePage = this.homePage.bind(this);
    this.logInPage = this.logInPage.bind(this);
    this.logOutPage = this.logOutPage.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentWillMount() {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      const user = jwtDecode(authToken);
      this.setState({
        user,
      });
      axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
    }
  }

  logOut() {
    localStorage.removeItem('authToken');
    this.setState({
      user: null,
    });
    delete axios.defaults.headers.common.Authorization;
  }

  logIn(authToken) {
    localStorage.setItem('authToken', authToken);
    this.setState({
      user: jwtDecode(authToken),
    });
    axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  }

  logInPage() {
    return <LogInPage logIn={this.logIn} />;
  }

  logOutPage() {
    return <LogOutPage logOut={this.logOut} />;
  }

  homePage() {
    return <HomePage user={this.state.user} />;
  }

  render() {
    return (
      <div>
        <MainNav user={this.state.user} />

        <Router>
          <Grid>
            <Route exact path="/" render={this.homePage} />
            <Route path="/authentication/login" render={this.logInPage} />
            <Route path="/authentication/logout" render={this.logOutPage} />
            <Route path="/authentication/register" component={RegistrationPage} />
          </Grid>
        </Router>
      </div>
    );
  }
}

export default App;
