import React, { Component, Fragment } from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton,
} from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import ValidationMessages from '../../components/ValidationMessages';
import appContext from '../../AppContext';
import { get } from '../../api';

class LunchForm extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);

    this.state = {
      isLoading: false,
      options: [],
    };
  }

  async handleSearch(e) {
    this.setState({
      isLoading: true,
    });
    try {
      const { data } = await get(`api/restaurant?restaurantName=${e}`, 'restaurantList', this.context);
      this.setState({
        options: data.map(r => r.restaurantName),
      });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  handleTextChange(e) {
    if (!Array.isArray(e)) {
      return this.props.handleTextChange({
        target: {
          name: 'location',
          value: e,
        },
      });
    }

    const [value] = e;
    return this.props.handleTextChange({
      target: {
        name: 'location',
        value,
      },
    });
  }

  render() {
    const { location, cost, revisit } = this.props.form;
    const { handleTextChange, handleButtonChange, handleSubmit } = this.props;

    return (
      <Fragment>
        <ValidationMessages errors={this.props.validationErrors} />
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="lunchFormlocation">
            <ControlLabel>Where did you eat?</ControlLabel>
            <AsyncTypeahead
              {...this.state}
              labelKey="location"
              minLength={3}
              onSearch={this.handleSearch}
              onChange={this.handleTextChange}
              onInputChange={this.handleTextChange}
              value={location}
              name="location"
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
      </Fragment>);
  }
}

LunchForm.contextType = appContext;

export default LunchForm;
