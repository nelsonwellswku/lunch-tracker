import React, { Component } from 'react';
import moment from 'moment';
import { createFetcher } from '../../api/fetchFactory';
import LunchForm from './LunchForm';

class LunchMasterDetail extends Component {
  constructor() {
    super();

    this.handleButtonChange = this.handleButtonChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createLunch = this.createLunch.bind(this);
    this.updateLunch = this.updateLunch.bind(this);

    this.state = {
      form: {
        location: '',
        cost: '',
        revisit: 'unsure',
      },
      currentLunchId: null,
      validationErrors: [],
    };
  }

  async componentDidMount() {
    const now = moment().format('YYYY-MM-DD');
    const {
      addFetch,
      removeFetch,
      user,
      logOut,
    } = this.props;

    if (user) {
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
          validationErrors: err.response.data.errors,
        });
      }
    }
  }

  render() {
    const {
      addFetch,
      removeFetch,
      user,
      logOut,
    } = this.props;

    return (
      <LunchForm
        validationErrors={this.state.validationErrors}
        handleTextChange={this.handleTextChange}
        handleButtonChange={this.handleButtonChange}
        handleSubmit={this.handleSubmit}
        form={this.state.form}
        addFetch={addFetch}
        removeFetch={removeFetch}
        user={user}
        logOut={logOut}
      />
    );
  }
}

export default LunchMasterDetail;
