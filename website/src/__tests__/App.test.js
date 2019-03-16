import React from 'react';
import App from '../App';
import { shallow } from 'enzyme';

describe('app component', () => {
  test('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
