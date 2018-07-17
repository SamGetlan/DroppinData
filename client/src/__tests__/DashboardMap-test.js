import React from 'react';
import renderer from 'react-test-renderer';
import DashboardMap from '../components/DashboardMap.jsx';
import { MemoryRouter } from 'react-router';
import locations from '../data.js';

global.document.getElementById = () => {
  return {
    getContext: () => { return {test: 'inside DashboardMap-test.js'}}
  };
}

test('DashboardMap renders correctly', () => {
  const element = renderer.create(
    <MemoryRouter>
      <DashboardMap 
        filteredUserGames={null}
      />
    </MemoryRouter>
  );
  let tree = element.toJSON();
  expect(tree).toMatchSnapshot();
});