import React, { useContext } from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import map from 'lodash/map';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import LunchContext from '../../contexts/LunchContext';

const LunchCalendar = (props: any) => {

  const lunchContext = useContext(LunchContext);

  const events = map(lunchContext.lunches, (lunch) => {
    return {
      lunchId: lunch.lunchId,
      title: `$${lunch.cost} - ${lunch.restaurant}`,
      start: lunch.date,
      end: lunch.date,
      allDay: true,
    };
  });

  return (<Calendar
    localizer={Calendar.momentLocalizer(moment)}
    defaultDate={new Date()}
    defaultView="month"
    events={events}
    style={{ height: '80vh' }}
    views={{ month: true }}
    selectable
    {...props}
  />);
};

export default LunchCalendar;
