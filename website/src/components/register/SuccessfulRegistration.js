import React from 'react';
import { Col } from 'react-bootstrap';

const SuccessfulRegistration = () => (
  <Col md={12}>
    <h1>Thank you for registering</h1>
    <p><a href="/authentication/login">Log in</a> to start tracking!</p>
  </Col>
);

export default SuccessfulRegistration;
