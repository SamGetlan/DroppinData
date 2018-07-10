import React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App.jsx';
import ActiveTile from '../components/ActiveTile.jsx';
import { MemoryRouter } from 'react-router';
import locations from '../data.js';

test('ActiveTile renders correctly', () => {
  const element = renderer.create(
    <MemoryRouter>
      <ActiveTile
        mapMarkerStyle={{top: 0, left: 0}}
        mapMarker={null}
        location={locations[0]}
        handleCoordinateChoiceClick={App.handleCoordinateChoiceClick}
      />
    </MemoryRouter>
  );
  let tree = element.toJSON();
  expect(tree).toMatchSnapshot();
});