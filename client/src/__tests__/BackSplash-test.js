import React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App.jsx';
import BackSplash from '../components/BackSplash.jsx';
import { MemoryRouter } from 'react-router';
import locations from '../data.js'

test('BackSplash renders correctly', () => {
  const element = renderer.create(
    <MemoryRouter>
      <BackSplash
        handleTileClick={App.handleTileClick} 
        resetMarker={App.resetMarker}
        userGames={null} 
        filteredLocations={locations.splice()} 
        userGameData={{}}
      />
    </MemoryRouter>
  );
  let tree = element.toJSON();
  expect(tree).toMatchSnapshot();
})