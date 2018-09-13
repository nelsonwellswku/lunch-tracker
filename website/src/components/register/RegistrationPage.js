import React, { Component } from 'react';
import RegistrationForm from './RegistrationForm';
import SuccessfulRegistration from './SuccessfulRegistration';

class RegistrationPage extends Component {
  constructor() {
    super();
    this.state = {
      isRegistrationSuccessful: false,
    };

    this.handleSuccessfulRegistration = this.handleSuccessfulRegistration.bind(this);
  }

  handleSuccessfulRegistration() {
    this.setState({
      isRegistrationSuccessful: true,
    });
  }

  render() {
    const { addFetch, removeFetch } = this.props;
    return this.state.isRegistrationSuccessful ?
      (<SuccessfulRegistration />) :
      (<RegistrationForm
        onSuccessfulRegistration={this.handleSuccessfulRegistration}
        addFetch={addFetch}
        removeFetch={removeFetch}
      />);
  }
}

export default RegistrationPage;
