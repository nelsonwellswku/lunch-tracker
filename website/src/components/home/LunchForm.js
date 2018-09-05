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
import moment from 'moment';
import { formatAsCurrency } from '../../presentation';

class LunchForm extends Component {
  constructor() {
    super();
    this.state = {
      lunches: {},
      currentLunch: null,
      validationErrors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentWillMount() {
    const now = moment().format('YYYY-MM-DD');
    const { fetch, user } = this.props;

    try {
      fetch.add('currentLunch');
      const results = await axios.get(`/api/user/${user.appUserId}/lunch`);
      if (results && results.data) {
        const lunches = results.data.reduce((prev, curr) => {
          return {
            [curr.lunchId]: curr,
            ...prev,
          };
        }, {});
        const currentLunch = results.data.find(x => x.lunchDate === now);

        const newState = {
          lunches,
          currentLunch,
        };

        this.setState(newState);
      }
    } finally {
      fetch.remove('currentLunch');
    }
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
      howMuchDidYouPay: this.state.howMuchDidYouPay.replace('$', ''),
      willYouGoBack: this.state.willYouGoBack,
    };
    this.props.fetch.add('lunchForm');
    try {
      await axios.post('/api/lunch', postBody);
      this.setState({
        validationErrors: [],
      })
    } catch (err) {
      if (err.response) {
        this.setState({
          validationErrors: err.response.data.errors.map(valErr => valErr.message),
        });
      }
    } finally {
      this.props.fetch.remove('lunchForm');
    }
  }

  render() {
    const validationListItems = this.state.validationErrors.map(x => <li key={x}>{x}</li>);
    const validationList = <ul>{validationListItems}</ul>;
    const validationDiv = <div className="alert alert-danger">{validationList}</div>;

    return (
      <Col md={4}>
        {this.state.validationErrors.length ? validationDiv : null}
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
              <ToggleButtonGroup
                type="radio"
                name="willYouGoBack"
                value={this.state.willYouGoBack}
                onChange={this.handleChange}
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
  }
}

export default LunchForm;
