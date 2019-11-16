import React from 'react';
import { shallow, render, mount } from 'enzyme';
import escapeSnapshot from '../../../tests/commons';
import Paginator from './index';

describe('Profile (Snapshot)', () => {
  const defaultProps = {
    currentPage: 0,
    pages: 20,
    next: 1,
    prev: undefined,
    eventHandler: jest.fn(() => {}),
  };

  it('renders in page 0', () => {
    const component = shallow(<Paginator {...defaultProps} />);
    expect(escapeSnapshot(component)).toMatchSnapshot();
  });

  it('renders in page 10', () => {
    defaultProps.currentPage = 10;
    defaultProps.prev = 9;
    const component = shallow(<Paginator {...defaultProps} />);
    expect(escapeSnapshot(component)).toMatchSnapshot();
  });
});
