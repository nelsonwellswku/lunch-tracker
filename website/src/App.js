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
import AppContext from './AppContext';

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
    return (<LogInPage logIn={this.logIn} />);
  }

  logOutPage() {
    return <LogOutPage logOut={this.logOut} />;
  }

  homePage() {
    return (<HomePage user={this.state.user} />);
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
    const context = {
      onPrefetch: this.addFetch,
      onPostfetch: this.removeFetch,
      onUnauthorized: this.logOut,
      user: this.state.user,
    };

    return (
      <AppContext.Provider value={context}>
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
                render={routeProps => <RegistrationVerificationPage {...routeProps} />}
              />
            </Grid>
          </Router>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
