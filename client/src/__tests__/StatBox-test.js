import React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App.jsx';
import Body from '../components/Body.jsx';
import StatBox from '../components/StatBox.jsx';
import { MemoryRouter } from 'react-router';
import locations from '../data.js';

test('StatBox renders correctly', () => {
  const element = renderer.create(
    <MemoryRouter >
      <StatBox
        currentGameType={'all'} 
        changeGameType={Body.changeGameType} 
        location={locations[0]} 
        handleSubmit={App.handleSubmit} 
        submitButtonState={true} 
        locations={locations} 
        userGameData={{}}
        deathMapMarker={[41, 42]}
        deathMapMarkerStyle={{top: '50%', left: '50%'}}
        userSettings={{}}
        handleDeathCoordinateChoiceClick={App.handleDeathCoordinateChoiceClick}
        checkDeathMarkerLocation={App.checkDeathMarkerLocation}
        loggedIn={false}
        statBoxFlashText={null}
      />
    </MemoryRouter>
  );
  let tree = element.toJSON();
  expect(tree).toMatchSnapshot();
});