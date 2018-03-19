import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      emailAddress: '',
      password: '',
      passwordConfirmation: '',
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
    console.log('here');
    submitEvent.preventDefault();
    const postBody = this.state;
    try {
      console.log('before');
      await axios.post('/api/authentication/registerUser', postBody);
      console.log('after');
    } catch (e) {
      console.log('in err handler');
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
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
      </div>);
  }
}

export default Register;
