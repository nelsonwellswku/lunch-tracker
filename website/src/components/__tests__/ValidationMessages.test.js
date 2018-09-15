import React from 'react';
import ValidationMessages from '../ValidationMessages';
import { shallow } from 'enzyme';

describe('validation messages component', () => {
  test('returns nothing if no props are passed', () => {
    const wrapper = shallow(<ValidationMessages />);
    expect(wrapper).toMatchSnapshot();
  });

  test('returns an unordered list of error messages', () => {
    const errors = [
      'This is error one',
      'This is error two',
    ];

    const wrapper = shallow(<ValidationMessages errors={errors} />);
    expect(wrapper).toMatchSnapshot();
  });
});
