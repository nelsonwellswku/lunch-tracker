import React from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Col,
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton,
} from 'react-bootstrap';
import ValidationMessages from '../../components/ValidationMessages';

const LunchForm = (props) => {
  const { location, cost, revisit } = props.form;
  const { handleTextChange, handleButtonChange, handleSubmit } = props;

  return (
    <Col md={4}>
      <ValidationMessages errors={props.validationErrors} />
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="lunchFormlocation">
          <ControlLabel>Where did you eat?</ControlLabel>
          <FormControl
            type="text"
            name="location"
            value={location}
            onChange={handleTextChange}
          />
        </FormGroup>
        <FormGroup controlId="lunchFormcost">
          <ControlLabel>How much did you pay?</ControlLabel>
          <FormControl
            type="number"
            min="1.00"
            step=".01"
            name="cost"
            value={cost}
            onChange={handleTextChange}
          />
        </FormGroup>
        <FormGroup controlId="revisit">
          <ControlLabel>Will you go back?</ControlLabel>
          <ButtonToolbar>
            <ToggleButtonGroup
              type="radio"
              name="revisit"
              value={revisit}
              onChange={handleButtonChange}
            >
              <ToggleButton value="unsure" >Unsure</ToggleButton>
              <ToggleButton value="yes">Yes</ToggleButton>
              <ToggleButton value="no">No</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
        </FormGroup>
        <Button type="submit">Save</Button>
      </form>
    </Col>
  );
};

export default LunchForm;
