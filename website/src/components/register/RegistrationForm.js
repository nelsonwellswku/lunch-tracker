import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap';
import { createFetcher } from '../../api/fetchFactory';

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
    try {
      await createFetcher().post('/api/authentication/registerUser', postBody);
      this.setState({
        validationErrors: [],
      });
      this.props.onSuccessfulRegistration();
    } catch (err) {
      if (err.response) {
        this.setState({
          validationErrors: err.response.data.errors.map(valErr => valErr.message),
        });
      }
    }
  }

  render() {
    const validationListItems = this.state.validationErrors.map(x => <li key={x}>{x}</li>);
    const validationList = <ul>{validationListItems}</ul>;
    const validationDiv = <div className="alert alert-danger">{validationList}</div>;
    return (
      <Col md={4}>
        <h1>Register</h1>
        {this.state.validationErrors.length ? validationDiv : null}
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

export default RegistrationForm;
