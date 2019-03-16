import React, { Component } from 'react';
import { post } from '../../api';
import AppContext from '../../AppContext';

class RegistrationVerificationPage extends Component {
  constructor() {
    super();

    this.state = {
      isSuccessful: false,
      fetchingComplete: false,
    };
  }

  async componentWillMount() {
    const {
      match: { params: { verificationToken } },
    } = this.props;

    const fetchName = 'registrationVerification';
    try {
      const url = '/api/authentication/verifyRegistrationToken';
      await post(url, { verificationToken }, fetchName, this.context);
      this.setState({ isSuccessful: true, fetchingComplete: true });
    } catch (err) {
      this.setState({ isSuccessful: false, fetchingComplete: true });
    }
  }

  render() {
    const { isSuccessful, fetchingComplete } = this.state;
    if (fetchingComplete && isSuccessful) {
      return <p>Verification successful. You may now log in.</p>;
    } else if (fetchingComplete && !isSuccessful) {
      return <p>Verification failure. Your token has expired.</p>;
    }

    return null;
  }
}

RegistrationVerificationPage.contextType = AppContext;

export default RegistrationVerificationPage;
