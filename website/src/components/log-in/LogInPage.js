import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap';
import axios from 'axios';
import Redirect from 'react-router-dom/Redirect';

class LogInPage extends Component {
  constructor() {
    super();
    this.state = {
      emailAddress: '',
      password: '',
      validationErrors: [],
      isLoggedIn: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(changeEvent) {
    const { name, value } = changeEvent.target;
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(submitEvent) {
    submitEvent.preventDefault();
    const postBody = {
      emailAddress: this.state.emailAddress,
      password: this.state.password,
    };
    try {
      const logInResult = await axios.post('/api/authentication/login', postBody);
      localStorage.setItem('authToken', logInResult.data.token);
      this.setState({
        isLoggedIn: true,
        validationErrors: [],
      });
    } catch (err) {
      if (err.response) {
        this.setState({
          validationErrors: err.response.data.errors.map(valErr => valErr.message),
        });
      }
    }
  }

  render() {
    if (this.state.isLoggedIn) {
      return <Redirect to="/" />;
    }

    const validationListItems = this.state.validationErrors.map(x => <li key={x}>{x}</li>);
    const validationList = <ul>{validationListItems}</ul>;
    const validationDiv = <div className="alert alert-danger">{validationList}</div>;
    return (
      <Col md={4}>
        <h1>Log In</h1>
        {this.state.validationErrors.length ? validationDiv : null}
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="logInFormEmailAddress">
            <ControlLabel>Email address</ControlLabel>
            <FormControl
              type="text"
              name="emailAddress"
              value={this.state.emailAddress}
              placeholder="Enter email address"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="logInFormPassword">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Enter password"
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button type="submit">Log In</Button>
        </form >
      </Col>);
  }
}

export default LogInPage;
