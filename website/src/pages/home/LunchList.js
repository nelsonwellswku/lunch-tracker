import React from 'react';

const LunchList = (props) => {
  const { lunches, setFormValueToLunchValues } = props;

  const lunchListItems = lunches.map((lunch, index) => {
    if (!lunch) {
      return <li key={0} onClick={() => setFormValueToLunchValues(index)}>No lunch yet!</li>;
    }

    return (
      <li key={lunch.lunchId} onClick={() => setFormValueToLunchValues(index)}>
        {lunch.lunchDate} - {lunch.location} - ${lunch.cost}
      </li>);
  });

  return (
    <div>
      <p>Recent Lunches</p>
      <ul>
        {lunchListItems}
      </ul>
    </div>
  );
};

export default LunchList;
