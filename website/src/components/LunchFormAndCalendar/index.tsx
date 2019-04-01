import React, { useState } from 'react';
import LunchContext, { ILunchContext, ILunch } from '../../contexts/LunchContext';
import LunchForm from '../LunchForm';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LunchCalendar from '../LunchCalendar';

const LunchFormAndCalendar = () => {

  const [lunches, setLunches] = useState<{ [key: number]: ILunch }>({});
  const [currentLunchId, setCurrentLunchId] = useState<number | null>(null);

  const lunchContext: ILunchContext = {
    lunches,
    currentLunchId,
    addLunch: (lunchId: number, lunch: ILunch) => setLunches({ ...lunches, [lunchId]: lunch }),
    updateLunch: (lunchId: number, lunch: ILunch) => setLunches({ ...lunches, [lunchId]: lunch }),
    setCurrentLunchId: (lunchId: number) => setCurrentLunchId(lunchId),
  };

  return (
    <LunchContext.Provider value={lunchContext}>
      <Row>
        <Col>
          <LunchForm />
        </Col>
        <Col>
          <LunchCalendar />
        </Col>
      </Row>
    </LunchContext.Provider>
  );
};

export default LunchFormAndCalendar;
