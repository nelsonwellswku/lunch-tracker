import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { ReplaceProps, BsPrefixProps } from 'react-bootstrap/helpers';
import { FormControlProps } from 'react-bootstrap/FormControl';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import AppContext from '../../AppContext';
import { UserClient } from '../../api/generated';
import appConfig from '../../appConfig';
import startOfDay from 'date-fns/startOfDay';

type FormInputEvent = React.FormEvent<ReplaceProps<"input", BsPrefixProps<"input"> & FormControlProps>>;

interface IFormField<T> {
  value: T,
  isValid: boolean | undefined,
}

type RevisitEnum = 'unsure' | 'yes' | 'no';

const LunchForm = () => {
  const appContext = useContext(AppContext);
  const [restaurant, setRestaurant] = useState<IFormField<string | null>>({ value: null, isValid: undefined, });
  const [cost, setCost] = useState<IFormField<number | null>>({ value: null, isValid: undefined, });
  const [revisit, setRevisit] = useState<IFormField<RevisitEnum>>({ value: 'unsure', isValid: undefined });
  const [lunchDate, setLunchDate] = useState<IFormField<Date>>({ value: startOfDay(new Date()), isValid: undefined });
  const [formError, setFormError] = useState<string | null>(null);
  const [hasTriedSubmission, setHasTriedSubmission] = useState<boolean>(false);

  const validateRestaurant = () => !!restaurant.value;
  const validateCost = () => !!cost.value;

  const validateForm = () => {
    const restaurantIsValid = validateRestaurant();
    const costIsValid = validateCost();

    setRestaurant({ value: restaurant.value, isValid: restaurantIsValid, });
    setCost({ value: cost.value, isValid: costIsValid });

    const isValid = restaurantIsValid && costIsValid;
    if (isValid) {
      setFormError(null);
    }
    return isValid;
  };

  const handleRestaurantChange = (event: FormInputEvent) => {
    if (!restaurant.isValid) {
      validateRestaurant();
    }

    setRestaurant({
      value: event.currentTarget.value || null,
      isValid: restaurant.isValid,
    });
  };

  const handleCostChange = (event: FormInputEvent) => {
    if (!cost.isValid) {
      validateCost();
    }

    setCost({
      value: parseFloat(event.currentTarget.value || ''),
      isValid: cost.isValid
    });
  }

  const handleOnRevisitChange = (value: RevisitEnum) => {
    setRevisit({
      value: value,
      isValid: revisit.isValid,
    });
  };

  const onSubmit = () => {
    setHasTriedSubmission(true);

    if (!validateForm()) {
      setFormError("Form invalid, please correct inputs.");
      return;
    }

    const { user } = appContext;
    if (!user) {
      return;
    }
    const client = new UserClient(appConfig.BaseUrl);
    client.authorizationToken = user.authToken;
    client.createLunch(user.appUserId, {
      cost: cost.value ? cost.value : undefined,
      restaurant: restaurant.value ? restaurant.value : undefined,
      revisit: revisit.value,
      lunchDate: lunchDate.value,
    })
    setFormError(null);
  };

  return (
    <Form>
      {
        formError ? <Alert variant="danger">{formError}</Alert> : null
      }
      <Form.Group controlId="formRestaurant">
        <Form.Label>Restaurant</Form.Label>
        <Form.Control
          type="input"
          name="restaurant"
          value={restaurant.value ? restaurant.value : undefined}
          onChange={handleRestaurantChange}
          onBlur={() => hasTriedSubmission ? validateForm() : null}
          isValid={restaurant.isValid}
          isInvalid={restaurant.isValid === false}
        />
      </Form.Group>
      <Form.Group controlId="formCost">
        <Form.Label>Cost</Form.Label>
        <Form.Control
          type="number"
          name="cost"
          value={cost.value ? cost.value.toString() : undefined}
          onChange={handleCostChange}
          onBlur={() => hasTriedSubmission ? validateForm() : null}
          isValid={cost.isValid}
          isInvalid={cost.isValid === false}
        />
      </Form.Group>
      <Form.Group controlId="formRevisit">
        <Form.Label>Revisit?</Form.Label>
        <ButtonToolbar>
          <ToggleButtonGroup
            type="radio"
            name="revisit"
            onChange={handleOnRevisitChange}
            defaultValue="unsure"
          >
            <Form.Check type="radio" label="Unsure" value="unsure" className="mr-3" />
            <Form.Check type="radio" label="Yes" value="yes" className="mr-3" />
            <Form.Check type="radio" label="No" value="no" />
          </ToggleButtonGroup>
        </ButtonToolbar>
      </Form.Group>
      <Button type="button" onClick={onSubmit}>
        Save
      </Button>
    </Form>)
}

export default LunchForm;
