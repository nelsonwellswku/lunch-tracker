import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { Col } from 'react-bootstrap';
import { createFetcher } from '../../api/fetchFactory';
import LunchForm from './LunchForm';
import LunchCalendar from './LunchCalendar';
import AppContext from '../../AppContext';

class LunchMasterDetail extends Component {
  constructor() {
    super();

    this.handleButtonChange = this.handleButtonChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createLunch = this.createLunch.bind(this);
    this.updateLunch = this.updateLunch.bind(this);
    this.handleSelectEvent = this.handleSelectEvent.bind(this);

    this.state = {
      form: {
        location: '',
        cost: '',
        revisit: 'unsure',
        lunchDate: moment().format('YYYY-MM-DD'),
      },
      lunches: [],
      currentLunchId: null,
      validationErrors: [],
    };
  }

  async componentDidMount() {
    const now = moment().format('YYYY-MM-DD');
    const {
      user,
    } = this.context;

    if (user) {
      const fetchName = 'currentLunch';
      const startDate = moment().startOf('month').format('YYYY-MM-DD');
      const endDate = moment().endOf('month').format('YYYY-MM-DD');

      const results = await createFetcher(fetchName, this.context)
        .get(`/api/user/${user.appUserId}/lunch?startDate=${startDate}&endDate=${endDate}`);

      if (results && results.data) {
        const currentLunch = results.data.find(x => x.lunchDate === now) || {};

        const newState = {
          currentLunchId: currentLunch.lunchId || '',
          lunches: currentLunch.lunchId ? results.data : [...results.data],
          form: {
            ...this.state.form,
            ...currentLunch,
          },
        };

        this.setState(newState);
      }
    }
  }

  setFormValueToLunchValues(index) {
    const lunch = this.state.lunches[index];
    if (!lunch) {
      this.setState({
        form: {
          location: '',
          cost: '',
          revisit: 'unsure',
          lunchDate: moment().format('YYYY-MM-DD'),
        },
        currentLunchId: null,
      });
    } else {
      this.setState({
        form: {
          location: lunch.location,
          cost: lunch.cost,
          revisit: lunch.revisit,
          lunchDate: lunch.lunchDate,
        },
        currentLunchId: lunch.lunchId,
      });
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
    } = this.context;

    const fetchName = 'updateLunch';
    return createFetcher(fetchName, this.context)
      .put(`api/user/${appUserId}/lunch/${lunchId}`, values);
  }

  createLunch(values) {
    const {
      user: { appUserId },
    } = this.context;

    const fetchName = 'createLunch';
    return createFetcher(fetchName, this.context)
      .post(`/api/user/${appUserId}/lunch`, values);
  }

  async handleSubmit(submitEvent) {
    submitEvent.preventDefault();
    const postBody = {
      location: this.state.form.location,
      cost: this.state.form.cost,
      revisit: this.state.form.revisit,
      lunchDate: this.state.form.lunchDate,
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
          validationErrors: err.response.data.errors,
        });
      }
    }
  }

  handleSelectEvent(selectEvent) {
    const lunchIndex = this.state.lunches.findIndex(lunch => selectEvent.lunchId === lunch.lunchId);
    this.setFormValueToLunchValues(lunchIndex);
  }

  render() {
    return (
      <Fragment>
        <Col md={4}>
          <h1>Lunch Log</h1>
          <LunchForm
            validationErrors={this.state.validationErrors}
            handleTextChange={this.handleTextChange}
            handleButtonChange={this.handleButtonChange}
            handleSubmit={this.handleSubmit}
            form={this.state.form}
          />
        </Col>
        <Col md={8}>
          <LunchCalendar
            lunches={this.state.lunches}
            onSelectEvent={this.handleSelectEvent}
          />
        </Col>
      </Fragment>
    );
  }
}

LunchMasterDetail.contextType = AppContext;

export default LunchMasterDetail;
