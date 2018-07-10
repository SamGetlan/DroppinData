import React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App.jsx';
import FullMap from '../components/FullMap.jsx';
import { MemoryRouter } from 'react-router';
import locations from '../data.js';

global.document.getElementsByClassName = () => {
  return [{
    test: 'inside FullMap-test.js'
  }]
}

test('FullMap renders correctly', () => {
  const element = renderer.create(
    <MemoryRouter>
      <FullMap 
        handleShowMapClick={App.handleShowMapClick}
        locations={locations}
        handleMapChoiceClick={App.handleMapChoiceClick}
        userSettings={{}}
        resetMarker={App.resetMarker}
      />
    </MemoryRouter>
  );
  let tree = element.toJSON();
  expect(tree).toMatchSnapshot();
});