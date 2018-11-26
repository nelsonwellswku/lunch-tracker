import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './App.css';
import HomePage from './pages/home/HomePage';
import RegistrationPage from './pages/register/RegistrationPage';
import RegistrationVerificationPage from './pages/registration-verification/RegistrationVerificationPage';
import LogInPage from './pages/log-in/LogInPage';
import LogOutPage from './pages/log-out/LogOutPage';
import MainNav from './components/MainNav';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      fetching: {},
    };

    this.homePage = this.homePage.bind(this);
    this.logInPage = this.logInPage.bind(this);
    this.logOutPage = this.logOutPage.bind(this);
    this.registrationPage = this.registrationPage.bind(this);
    this.registrationVerificationPage = this.registrationVerificationPage.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.addFetch = this.addFetch.bind(this);
    this.removeFetch = this.removeFetch.bind(this);
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

  addFetch(item) {
    this.setState({
      fetching: {
        ...this.state.fetching,
        [item]: 1,
      },
    });
  }

  removeFetch(item) {
    const newFetching = {
      ...this.state.fetching,
    };

    delete newFetching[item];

    this.setState({
      fetching: newFetching,
    });
  }

  logOut() {
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

  logInPage() {
    return (<LogInPage
      logIn={this.logIn}
      addFetch={this.addFetch}
      removeFetch={this.removeFetch}
    />);
  }

  logOutPage() {
    return <LogOutPage logOut={this.logOut} />;
  }

  homePage() {
    return (<HomePage
      user={this.state.user}
      addFetch={this.addFetch}
      removeFetch={this.removeFetch}
      logOut={this.logOut}
    />);
  }

  registrationPage() {
    return (
      <RegistrationPage
        addFetch={this.addFetch}
        removeFetch={this.removeFetch}
      />
    );
  }

  registrationVerificationPage(routeProps) {
    return (
      <RegistrationVerificationPage
        addFetch={this.addFetch}
        removeFetch={this.removeFetch}
        {...routeProps}
      />);
  }

  render() {
    return (
      <div>
        <MainNav user={this.state.user} fetching={this.state.fetching} />

        <Router>
          <Grid>
            <Route exact path="/" render={this.homePage} />
            <Route exact path="/authentication/login" render={this.logInPage} />
            <Route exact path="/authentication/logout" render={this.logOutPage} />
            <Route exact path="/authentication/register" render={this.registrationPage} />
            <Route
              path="/authentication/register/verify/:verificationToken"
              render={routeProps => this.registrationVerificationPage(routeProps)}
            />
          </Grid>
        </Router>
      </div>
    );
  }
}

export default App;
