import React, { Component } from 'react';
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
import axios from 'axios';

class LunchForm extends Component {
  constructor() {
    super();
    this.state = {
      whereDidYouEat: '',
      howMuchDidYouPay: '',
      willYouGoBack: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(changeEvent) {
    if (changeEvent.target) {
      const { name, value } = changeEvent.target;
      this.setState({
        [name]: value,
      });
    } else {
      this.setState({
        willYouGoBack: changeEvent,
      });
    }
  }

  async handleSubmit(submitEvent) {
    submitEvent.preventDefault();
    const postBody = {
      whereDidYouEat: this.state.whereDidYouEat,
      howMuchDidYouPay: this.state.howMuchDidYouPay,
      willYouGoBack: this.state.willYouGoBack,
    };
    await axios.post('/api/lunch', postBody);
  }

  render() {
    return (
      <Col md={4}>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="lunchFormWhereDidYouEat">
            <ControlLabel>Where did you eat?</ControlLabel>
            <FormControl
              type="text"
              name="whereDidYouEat"
              value={this.state.whereDidYouEat}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="lunchFormHowMuchDidYouPay">
            <ControlLabel>How much did you pay?</ControlLabel>
            <FormControl
              type="text"
              name="howMuchDidYouPay"
              value={this.state.howMuchDidYouPay}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="willYouGoBack">
            <ControlLabel>Will you go back?</ControlLabel>
            <ButtonToolbar>
              <ToggleButtonGroup type="radio" name="willYouGoBack" defaultValue="unsure" onChange={this.handleChange}>
                <ToggleButton value="unsure">Unsure</ToggleButton>
                <ToggleButton value="yes">Yes</ToggleButton>
                <ToggleButton value="no">No</ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>
          </FormGroup>
          <Button type="submit">Save</Button>
        </form>
      </Col>
    );
  }
}

export default LunchForm;