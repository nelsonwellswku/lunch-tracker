import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import AppContext from '../../contexts/AppContext';
import LunchFormAndCalendar from '../LunchFormAndCalendar';

const Home = () => {
  const context = useContext(AppContext);

  return (
    <Container>
      <h1 className='mt-3 mb-4'>Welcome to Lunch Tracker</h1>
      {
        !context.user ? <p>Sign in to get started</p> : <LunchFormAndCalendar />
      }
    </Container>
  );
}

export default Home;
