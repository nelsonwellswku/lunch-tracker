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
import moment from 'moment';
import { createFetcher } from '../../api/fetchFactory';
import ValidationMessages from '../../components/ValidationMessages';

class LunchForm extends Component {
  constructor() {
    super();
    this.state = {
      currentLunchId: null,
      validationErrors: [],
      form: {
        location: '',
        cost: '',
        revisit: 'unsure',
      },
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleButtonChange = this.handleButtonChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createLunch = this.createLunch.bind(this);
    this.updateLunch = this.updateLunch.bind(this);
  }

  async componentWillMount() {
    const now = moment().format('YYYY-MM-DD');
    const {
      addFetch,
      removeFetch,
      user,
      logOut,
    } = this.props;

    const fetchName = 'currentLunch';

    const results = await createFetcher({
      onUnauthorized: logOut,
      onPrefetch: () => addFetch(fetchName),
      onPostfetch: () => removeFetch(fetchName),
    }).get(`/api/user/${user.appUserId}/lunch`);

    if (results && results.data) {
      const currentLunch = results.data.find(x => x.lunchDate === now) || {};

      const newState = {
        currentLunchId: currentLunch.lunchId || '',
        form: {
          ...this.state.form,
          ...currentLunch,
        },
      };

      this.setState(newState);
    }
  }

  handleTextChange(changeEvent) {
    const { target } = changeEvent;
    const { name, value } = target;

    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      },
    });
  }

  handleButtonChange(changeEvent) {
    this.setState({
      form: {
        ...this.state.form,
        revisit: changeEvent,
      },
    });
  }

  updateLunch(values) {
    const { currentLunchId: lunchId } = this.state;
    const {
      user: { appUserId },
      logout,
      addFetch,
      removeFetch,
    } = this.props;
    const fetchName = 'updateLunch';
    return createFetcher({
      onUnauthorized: logout,
      onPrefetch: () => addFetch(fetchName),
      onPostfetch: () => removeFetch(fetchName),
    }).put(`api/user/${appUserId}/lunch/${lunchId}`, values);
  }

  createLunch(values) {
    const {
      user: { appUserId },
      logout,
      addFetch,
      removeFetch,
    } = this.props;
    const fetchName = 'createLunch';
    return createFetcher({
      onUnauthorized: logout,
      onPrefetch: () => addFetch(fetchName),
      onPostfetch: () => removeFetch(fetchName),
    }).post(`/api/user/${appUserId}/lunch`, values);
  }

  async handleSubmit(submitEvent) {
    submitEvent.preventDefault();
    const now = moment().format('YYYY-MM-DD');
    const postBody = {
      location: this.state.form.location,
      cost: this.state.form.cost,
      revisit: this.state.form.revisit,
      lunchDate: now,
    };

    const fn = this.state.currentLunchId ? this.updateLunch : this.createLunch;

    try {
      await fn(postBody);
      this.setState({
        validationErrors: [],
      });
    } catch (err) {
      if (err.response) {
        this.setState({
          validationErrors: err.response.data.errors.map(valErr => valErr.message),
        });
      }
    }
  }

  render() {
    const { location, cost, revisit } = this.state.form;

    return (
      <Col md={4}>
        <ValidationMessages errors={this.state.validationErrors} />
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="lunchFormlocation">
            <ControlLabel>Where did you eat?</ControlLabel>
            <FormControl
              type="text"
              name="location"
              value={location}
              onChange={this.handleTextChange}
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
              onChange={this.handleTextChange}
            />
          </FormGroup>
          <FormGroup controlId="revisit">
            <ControlLabel>Will you go back?</ControlLabel>
            <ButtonToolbar>
              <ToggleButtonGroup
                type="radio"
                name="revisit"
                value={revisit}
                onChange={this.handleButtonChange}
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
