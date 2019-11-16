import React from 'react';
import { shallow, render, mount } from 'enzyme';
import escapeSnapshot from '../../../tests/commons';
import Main from './index';

describe('Main (Snapshot)', () => {
  const defaultProps = {};

  it('renders with default props', () => {
    const component = shallow(<Main {...defaultProps} />);
    expect(escapeSnapshot(component)).toMatchSnapshot();
  });
});
