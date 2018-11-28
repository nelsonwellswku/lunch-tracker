import React, { Component } from 'react';
import { createFetcher } from '../../api/fetchFactory';
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
    const { onPrefetch, onPostfetch } = this.context;
    try {
      await createFetcher(fetchName, {
        onPrefetch,
        onPostfetch: () => {
          onPostfetch(fetchName);
          this.setState({ fetchingComplete: true });
        },
      }).post('/api/authentication/verifyRegistrationToken', { verificationToken });

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

RegistrationVerificationPage.contextType = AppContext;

export default RegistrationVerificationPage;
