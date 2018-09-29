import React from 'react';
import { Col, Button, Glyphicon } from 'react-bootstrap';

const LunchList = (props) => {
  const { lunches, setFormValueToLunchValues } = props;

  const lunchListItems = lunches.map((l, index) => {
    const lunch = l || {};

    return (
      <div key={lunch.lunchId || 0}>
        <Col md={10}>
          <h4>{lunch.location}</h4>
          <p>{lunch.lunchDate} - ${lunch.cost}</p>
        </Col>
        <Col md={2}>
          <h4>
            <Button bsSize="xsmall" onClick={() => setFormValueToLunchValues(index)}>
              <Glyphicon glyph="pencil" />
            </Button>
          </h4>
        </Col>
      </div>);
  });

  return (
    <div>
      <h3>Recent Lunches</h3>
      {lunchListItems}
    </div>
  );
};

export default LunchList;
