import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { Col } from 'react-bootstrap';
import { get, post, put } from '../../api';
import LunchForm from './LunchForm';
import LunchCalendar from './LunchCalendar';
import AppContext from '../../AppContext';

const dateFormat = 'YYYY-MM-DD';

class LunchMasterDetail extends Component {
  constructor() {
    super();

    this.handleButtonChange = this.handleButtonChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createLunch = this.createLunch.bind(this);
    this.updateLunch = this.updateLunch.bind(this);
    this.handleSelectEvent = this.handleSelectEvent.bind(this);
    this.handleSelectSlot = this.handleSelectSlot.bind(this);
    this.dayPropGetter = this.dayPropGetter.bind(this);

    this.state = {
      form: {
        location: '',
        cost: '',
        revisit: 'unsure',
        lunchDate: moment().format(dateFormat),
      },
      lunches: [],
      currentLunchId: null,
      validationErrors: [],
    };
  }

  async componentDidMount() {
    const now = moment().format(dateFormat);
    const {
      user,
    } = this.context;

    if (user) {
      const fetchName = 'currentLunch';
      const startDate = moment().startOf('month').format(dateFormat);
      const endDate = moment().endOf('month').format(dateFormat);

      const url = `/api/user/${user.appUserId}/lunch?startDate=${startDate}&endDate=${endDate}`;
      const results = await get(url, fetchName, this.context);

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
          lunchDate: moment().format(dateFormat),
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

  dayPropGetter(date) {
    if (moment(date).format(dateFormat) === this.state.form.lunchDate) {
      return {
        style: {
          background: 'wheat',
        },
      };
    }

    return {};
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

  handleSelectSlot(selectSlot) {
    const { start: selectedDate } = selectSlot;
    const formattedSelectedDate = moment(selectedDate).format(dateFormat);
    const lunchIndex =
      this.state.lunches.findIndex(lunch => formattedSelectedDate === lunch.lunchDate);

    if (lunchIndex > -1) {
      this.setFormValueToLunchValues(lunchIndex);
    } else {
      this.setState({
        form: {
          location: '',
          cost: '',
          revisit: 'unsure',
          lunchDate: formattedSelectedDate,
        },
        currentLunchId: null,
      });
    }
  }

  updateLunch(values) {
    const { currentLunchId: lunchId } = this.state;
    const {
      user: { appUserId },
    } = this.context;

    const fetchName = 'updateLunch';
    const url = `api/user/${appUserId}/lunch/${lunchId}`;
    return put(url, values, fetchName, this.context);
  }

  createLunch(values) {
    const {
      user: { appUserId },
    } = this.context;

    const fetchName = 'createLunch';
    const url = `/api/user/${appUserId}/lunch`;
    return post(url, values, fetchName, this.context);
  }

  handleButtonChange(changeEvent) {
    this.setState({
      form: {
        ...this.state.form,
        revisit: changeEvent,
      },
    });
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

  render() {
    return (
      <Fragment>
        <Col md={4}>
          <h1>Lunch Log</h1>
          <p><strong>{this.state.form.lunchDate}</strong></p>
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
            onSelectSlot={this.handleSelectSlot}
            dayPropGetter={this.dayPropGetter}
          />
        </Col>
      </Fragment>
    );
  }
}

LunchMasterDetail.contextType = AppContext;

export default LunchMasterDetail;
