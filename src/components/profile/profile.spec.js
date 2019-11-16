import React from 'react';
import { shallow, render, mount } from 'enzyme';
import escapeSnapshot from '../../../tests/commons';
import Profile from './index';

describe('Profile (Snapshot)', () => {
  const defaultProps = {
    id: 20,
    name: "Ants in my Eyes Johnson",
    status: "unknown",
    species: "Human",
    type: "Human with ants in his eyes",
    gender: "Male",
    origin: {
      name: "Origin",
      type: "type",
      dimension: "dimension",
    },
    location: {
      name: "Interdimensional Cable",
      type: "type",
      dimension: "dimension",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/20.jpeg",
    episodes: [
      "Pilot"
    ],
  };

  const propsMissingData = {
    id: 20,
    name: "Ants in my Eyes Johnson",
    status: "unknown",
    species: "Human",
    type: "Human with ants in his eyes",
    gender: "Male",
    origin: {
      name: "unknown",
    },
    location: {
      name: "Interdimensional Cable",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/20.jpeg",
    episodes: [
      "Pilot"
    ],
  };

  it('renders with all data', () => {
    const component = shallow(<Profile {...defaultProps} />);
    expect(escapeSnapshot(component)).toMatchSnapshot();
  });

  it('renders with some missing data', () => {
    defaultProps.currentPage = 10;
    defaultProps.prev = 9;
    const component = shallow(<Profile {...propsMissingData} />);
    expect(escapeSnapshot(component)).toMatchSnapshot();
  });
});
