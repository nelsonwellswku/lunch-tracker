import React, { Component } from 'react';
import { createFetcher } from '../../api/fetchFactory';

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
      addFetch,
      removeFetch,
      match: { params: { verificationToken } },
    } = this.props;

    const fetchName = 'registrationVerification';
    try {
      await createFetcher({
        onPrefetch: () => addFetch(fetchName),
        onPostfetch: () => { removeFetch(fetchName); this.setState({ fetchingComplete: true }); },
      }).post('/api/authentication/verify-registration-token', { verificationToken });

      this.setState({ isSuccessful: true });
    } catch (err) {
      this.setState({ isSuccessful: false });
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

export default RegistrationVerificationPage;
