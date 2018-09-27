import React from 'react';

const LunchList = (props) => {
  const lunchListItems = props.lunches.map(lunch =>
    (
      <li key={lunch.lunchId}>
        {lunch.location}
      </li>));

  return (
    <div>
      <p>Lunches</p>
      <ul>
        {lunchListItems}
      </ul>
    </div>
  );
};

export default LunchList;
