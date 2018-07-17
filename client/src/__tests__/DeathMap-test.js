import React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App.jsx';
import DeathMap from '../components/DeathMap.jsx';
import { MemoryRouter } from 'react-router';

global.document.getElementsByClassName = () => {
  return [{
    test: 'inside DeathMap-test.js'
  }]
}

test('DeathMap renders correctly', () => {
  const element = renderer.create(
    <MemoryRouter>
      <DeathMap 
        submitButtonState={false}
        handleCoordinateChoiceClick={App.handleDeathCoordinateChoiceClick}
        userSettings={{}}
        deathMapMarker={[41, 42]}
        deathMapMarkerStyle={{top: '50%', left: '50%'}}
        checkDeathMarkerLocation={App.checkDeathMarkerLocation}
        submitGame={console.log('Button is temporary disabled')}
      />
    </MemoryRouter>
  );
  let tree = element.toJSON();
  expect(tree).toMatchSnapshot();
});