import React, { useState, useEffect, useContext } from 'react';
import LunchContext, { ILunchContext, ILunch } from '../../contexts/LunchContext';
import LunchForm from '../LunchForm';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LunchCalendar from '../LunchCalendar';
import AppContext from '../../contexts/AppContext';
import ApiContext from '../../contexts/ApiContext';
import startOfMonth from 'date-fns/esm/startOfMonth';
import endOfMonth from 'date-fns/esm/endOfMonth';
import { normalize, schema } from 'normalizr';

const lunchSchema = new schema.Entity('lunches', {}, { idAttribute: 'lunchId' });
const lunchListSchema = [lunchSchema];

const LunchFormAndCalendar = () => {

  const [lunches, setLunches] = useState<{ [key: number]: ILunch }>({});
  const [currentLunchId, setCurrentLunchId] = useState<number | null>(null);

  const { user } = useContext(AppContext);
  const { userClient } = useContext(ApiContext);

  useEffect(() => {
    if (!user) {
      return;
    }

    userClient.getLunches(user.appUserId, undefined, undefined)
      .then(response => {
        if (!response) {
          return;
        }

        var normalizedLunches = normalize(response.lunches, lunchListSchema);
        setLunches(normalizedLunches.entities['lunches']);
      });
  }, [user, userClient]);

  const lunchContext: ILunchContext = {
    lunches,
    currentLunchId,
    AddOrUpdateLunch: (lunchId: number, lunch: ILunch) => setLunches({ ...lunches, [lunchId]: lunch }),
    setCurrentLunchId: (lunchId: number) => setCurrentLunchId(lunchId),
    fetchLunches: async (date: Date) => {
      if (!user) { return; }

      const response = await userClient.getLunches(
        user.appUserId,
        startOfMonth(date),
        endOfMonth(date),
      );

      if (response) {
        const normalizedLunches = normalize(response.lunches, lunchListSchema);
        setLunches({
          ...lunches,
          ...normalizedLunches.entities['lunches'],
        });
      }
    },
  };

  return (
    <LunchContext.Provider value={lunchContext}>
      <Row>
        <Col md={3}>
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
