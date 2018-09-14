import React from 'react';

const ValidationMessages = ({ errors } = {}) => {
  if (!errors.length) { return null; }

  return (
    <div className="alert alert-danger">
      <ul>
        {errors.map(x => <li key={x}>{x}</li>)}
      </ul>
    </div>
  );
};

export default ValidationMessages;
