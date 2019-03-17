import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const MainNav = () => {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">Lunch Tracker</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default MainNav;
