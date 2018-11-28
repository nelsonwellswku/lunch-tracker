import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap';
import { createFetcher } from '../../api/fetchFactory';
import ValidationMessages from '../../components/ValidationMessages';
import AppContext from '../../AppContext';

class RegistrationForm extends Component {
  constructor() {
    super();
    this.state = {
      emailAddress: '',
      password: '',
      passwordConfirmation: '',
      validationErrors: [],
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
      passwordConfirmation: this.state.passwordConfirmation,
    };

    const fetchName = 'registrationForm';
    const { onPrefetch, onPostfetch } = this.context;
    try {
      await createFetcher(fetchName, {
        onPrefetch,
        onPostfetch,
      }).post('/api/authentication/registerUser', postBody);
      this.setState({
        validationErrors: [],
      });
      this.props.onSuccessfulRegistration();
    } catch (err) {
      if (err.response) {
        this.setState({
          validationErrors: err.response.data.errors,
        });
      }
    }
  }

  render() {
    return (
      <Col md={4}>
        <h1>Register</h1>
        <ValidationMessages errors={this.state.validationErrors} />
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="registrationFormEmailAddress">
            <ControlLabel>Email address</ControlLabel>
            <FormControl
              type="text"
              name="emailAddress"
              value={this.state.emailAddress}
              placeholder="Enter email address"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="registrationFormPassword">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Enter password"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="registrationFormPasswordConfirmation">
            <ControlLabel>Password Confirmation</ControlLabel>
            <FormControl
              type="password"
              name="passwordConfirmation"
              value={this.state.passwordConfirmation}
              placeholder="Confirm password"
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button type="submit">Register</Button>
        </form >
      </Col>);
  }
}

RegistrationForm.contextType = AppContext;

export default RegistrationForm;
