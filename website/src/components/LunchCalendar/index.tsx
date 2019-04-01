import React, { useContext } from "react";
import LunchContext from "../../contexts/LunchContext";
import map from 'lodash/map';

const LunchCalendar = () => {
  const lunchContext = useContext(LunchContext);

  return (
    <div>
      <h2>Calendar</h2>
      {map(lunchContext.lunches, lunch => (
        <p>{`${lunch.restaurant} - ${lunch.cost}`}</p>
      ))}
    </div>
  )
};

export default LunchCalendar;
