import React from 'react';
import moment from 'moment';
import Calendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = Calendar.momentLocalizer(moment);

const LunchCalendar = (props) => {
  const events = props.lunches.map((lunch) => {
    const [year, month, day] = lunch.lunchDate.split('-');
    const lunchDate = new Date(year, month - 1, day);
    return {
      title: lunch.location,
      start: lunchDate,
      end: lunchDate,
      allDay: true,
    };
  });

  return (<Calendar
    localizer={localizer}
    defaultDate={new Date()}
    defaultView="month"
    events={events}
    style={{ height: '100vh' }}
  />);
};

export default LunchCalendar;
