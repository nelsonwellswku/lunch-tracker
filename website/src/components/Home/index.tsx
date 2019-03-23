import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import AppContext from '../../AppContext';

const Home = () => {
  const context = useContext(AppContext);

  return (
    <Container>
      <h1 className='mt-3'>Welcome to Lunch Tracker</h1>
      {
        !context.user ? <p>Sign in to get started</p> : null
      }
    </Container>
  );
}

export default Home;
