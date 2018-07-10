import React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App.jsx';
import Tile from '../components/Tile.jsx';
import { MemoryRouter } from 'react-router';
import locations from '../data.js'

test('Tile renders correctly', () => {
  const element = renderer.create(
    <MemoryRouter>
      <Tile
        resetMarker={App.resetMarker}
        handleTileClick={App.handleTileClick}  
        stats={{averagePlace: 'N/A', averageKills: 'N/A'}} 
        location={locations[0]} 
      />
    </MemoryRouter>
  );
  let tree = element.toJSON();
  expect(tree).toMatchSnapshot();
})