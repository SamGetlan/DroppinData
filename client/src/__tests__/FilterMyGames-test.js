import React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App.jsx';
import FilterMyGames from '../components/FilterMyGames.jsx';
import { MemoryRouter } from 'react-router';
import locations from '../data.js'

test('FilterMyGames renders correctly', () => {
  const element = renderer.create(
    <MemoryRouter>
      <FilterMyGames
        handleFiltering={App.handleFiltering}
        filterOptions={{
          startLocation: 'All',
          deathLocation: 'All',
          worstPlace: 100,
          bestPlace: 1,
          worstKills: 0,
          bestKills: 99,
          worstLoot: 0,
          bestLoot: 10,
          minDistanceTraveled: 0,
          maxDistanceTraveled: 3640,
          days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          timeStart: '00:00',
          timeEnd: '23:59',
        }}
        locations={locations}
      />
    </MemoryRouter>
  );
  let tree = element.toJSON();
  expect(tree).toMatchSnapshot();
});