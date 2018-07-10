import React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App.jsx';
import FilterLocations from '../components/FilterLocations.jsx';
import { MemoryRouter } from 'react-router';
import locations from '../data.js';

test('FilterLocations renders correctly', () => {
  const component = renderer.create(
    <MemoryRouter>
      <FilterLocations
      locations={locations}
      filteredLocations={locations.slice()}
      filterOut={App.filterOut}
      filterIn={App.filterIn}
      handleFilterClick={App.handleFilterClick}
      hardGroupClick={App.hardGroupClick}
      notRecentGroupClick={App.notRecentGroupClick}
      killsGroupClick={App.killsGroupClick}
      placeGroupClick={App.placeGroupClick}
      popularGroupClick={App.popularGroupClick}
      filterAllIn={App.filterAllIn}
      filterAllOut={App.filterAllOut}
      userSettings={{}}
      />
    </MemoryRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});