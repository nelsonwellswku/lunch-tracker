import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import MainNav from './components/main-nav/MainNav';
import RegistrationPage from './components/register/RegistrationPage';
import LogInPage from './components/log-in/LogInPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
    };
  }

  componentWillMount() {
    const authToken = localStorage.getItem('authToken');
    const isLoggedIn = !!authToken;
    this.setState({
      isLoggedIn,
    });
  }

  render() {
    return (
      <div>
        <MainNav isLoggedIn={this.state.isLoggedIn} />

        <Router>
          <Grid>
            <Route exact path="/" component={Home} />
            <Route path="/authentication/login" component={LogInPage} />
            <Route path="/authentication/register" component={RegistrationPage} />
          </Grid>
        </Router>
      </div>
    );
  }
}


export default App;
