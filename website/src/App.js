import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
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
      fetching: {},
    };

    this.homePage = this.homePage.bind(this);
    this.logInPage = this.logInPage.bind(this);
    this.logOutPage = this.logOutPage.bind(this);
    this.registrationPage = this.registrationPage.bind(this);
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
    return <LogInPage logIn={this.logIn} />;
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

  render() {
    return (
      <div>
        <MainNav user={this.state.user} fetching={this.state.fetching} />

        <Router>
          <Grid>
            <Route exact path="/" render={this.homePage} />
            <Route path="/authentication/login" render={this.logInPage} />
            <Route path="/authentication/logout" render={this.logOutPage} />
            <Route path="/authentication/register" render={this.registrationPage} />
          </Grid>
        </Router>
      </div>
    );
  }
}

export default App;
