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

class LunchForm extends Component {
  constructor() {
    super();
    this.state = {
      lunches: {},
      currentLunchId: null,
      validationErrors: [],
      form: {
        location: '',
        cost: '',
        revisit: 'unsure',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.withFetch = this.withFetch.bind(this);
    this.createLunch = this.createLunch.bind(this);
    this.updateLunch = this.updateLunch.bind(this);
  }

  async componentWillMount() {
    const now = moment().format('YYYY-MM-DD');
    const { fetch, user } = this.props;

    try {
      fetch.add('currentLunch');
      const results = await axios.get(`/api/user/${user.appUserId}/lunch`);
      if (results && results.data) {
        const lunches = results.data.reduce((prev, curr) => ({
          [curr.lunchId]: curr,
          ...prev,
        }), {});
        const currentLunch = results.data.find(x => x.lunchDate === now) || {};

        const newState = {
          lunches,
          currentLunchId: currentLunch.lunchId || '',
          form: {
            ...this.state.form,
            ...currentLunch,
          },
        };

        this.setState(newState);
      }
    } finally {
      fetch.remove('currentLunch');
    }
  }

  handleChange(changeEvent) {
    const { target } = changeEvent;

    if (target) {
      const { name, value } = target;
      this.setState({
        form: {
          ...this.state.form,
          [name]: value,
        },
      });
    } else {
      this.setState({
        form: {
          ...this.state.form,
          revisit: changeEvent,
        },
      });
    }
  }

  async withFetch(fn, name) {
    this.props.fetch.add(name);
    try {
      await fn();
    } finally {
      this.props.fetch.remove(name);
    }
  }

  async updateLunch(values) {
    const { currentLunchId: lunchId } = this.state;
    const { user: { appUserId } } = this.props;
    this.withFetch(() => axios.put(`api/user/${appUserId}/lunch/${lunchId}`, values));
  }

  async createLunch(values) {
    const { user: { appUserId } } = this.props;
    this.withFetch(() => axios.post(`/api/user/${appUserId}/lunch`, values));
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
    const validationListItems = this.state.validationErrors.map(x => <li key={x}>{x}</li>);
    const validationList = <ul>{validationListItems}</ul>;
    const validationDiv = <div className="alert alert-danger">{validationList}</div>;

    const { location, cost, revisit } = this.state.form;

    return (
      <Col md={4}>
        {this.state.validationErrors.length ? validationDiv : null}
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="lunchFormlocation">
            <ControlLabel>Where did you eat?</ControlLabel>
            <FormControl
              type="text"
              name="location"
              value={location}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="lunchFormcost">
            <ControlLabel>How much did you pay?</ControlLabel>
            <FormControl
              type="text"
              name="cost"
              value={cost}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="revisit">
            <ControlLabel>Will you go back?</ControlLabel>
            <ButtonToolbar>
              <ToggleButtonGroup
                type="radio"
                name="revisit"
                value={revisit}
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
