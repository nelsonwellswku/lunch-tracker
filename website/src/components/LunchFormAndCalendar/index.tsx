import React, { useState, useEffect, useContext } from 'react';
import reduce from 'lodash/reduce';
import map from 'lodash/map';
import LunchContext, { ILunchContext, ILunch, RevisitEnum } from '../../contexts/LunchContext';
import LunchForm from '../LunchForm';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LunchCalendar from '../LunchCalendar';
import { UserClient } from '../../api/generated';
import appConfig from '../../appConfig';
import AppContext from '../../contexts/AppContext';
import { Dictionary } from 'lodash';


const LunchFormAndCalendar = () => {

  const [lunches, setLunches] = useState<{ [key: number]: ILunch }>({});
  const [currentLunchId, setCurrentLunchId] = useState<number | null>(null);

  const appContext = useContext(AppContext);

  useEffect(() => {
    const userClient = new UserClient(appConfig.BaseUrl);
    userClient.authorizationToken = appContext.user && appContext.user.authToken || '';
    const user = appContext.user;
    if (!user) {
      return;
    }

    userClient.getLunches(user.appUserId, undefined, undefined)
      .then(response => {
        if (!response) {
          return;
        }

        const lunches: ILunch[] = map(response.lunches, lunch => ({
          lunchId: lunch.lunchId || 0,
          restaurant: lunch.restaurant || null,
          cost: lunch.cost || null,
          revisit: (lunch.revisit as RevisitEnum) || 'unsure',
          date: lunch.date || null,
        }));

        const lunchDictionary = reduce(lunches, (prev: Dictionary<ILunch>, curr: ILunch) => {
          return {
            ...prev,
            [curr.lunchId]: curr,
          }
        }, {});

        setLunches(lunchDictionary);
      });
  }, []);

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
