import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap';
import Redirect from 'react-router-dom/Redirect';
import { createFetcher } from '../../api/fetchFactory';
import ValidationMessages from '../../components/ValidationMessages';

class LogInPage extends Component {
  constructor(props) {
    super();
    this.state = {
      emailAddress: '',
      password: '',
      validationErrors: [],
      isLoggedIn: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logIn = props.logIn;
  }

  handleChange(changeEvent) {
    const { name, value } = changeEvent.target;
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(submitEvent) {
    submitEvent.preventDefault();
    const { addFetch, removeFetch } = this.props;
    const postBody = {
      emailAddress: this.state.emailAddress,
      password: this.state.password,
    };
    const fetchName = 'loginForm';
    try {
      const logInResult = await createFetcher({
        onPrefetch: () => addFetch(fetchName),
        onPostfetch: () => removeFetch(fetchName),
      }).post('/api/authentication/login', postBody);
      this.logIn(logInResult.data.token);
      this.setState({
        isLoggedIn: true,
        validationErrors: [],
      });
    } catch (err) {
      if (err.response) {
        this.setState({
          validationErrors: err.response.data.errors,
        });
      }
    }
  }

  render() {
    if (this.state.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <Col md={4}>
        <h1>Log In</h1>
        <ValidationMessages errors={this.state.validationErrors} />
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
