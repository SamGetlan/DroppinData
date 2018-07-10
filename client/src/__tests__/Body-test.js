import React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App.jsx';
import Body from '../components/Body.jsx';
import locations from '../data.js';

test('Body renders correctly', () => {
  const component = renderer.create(
    <Body 
      filteredLocations={locations.slice()}
      activeIndex={false}
      handleSubmit={App.handleGameSubmit}
      active={false}
      handleActionClick={App.handleActionClick}
      userGames={null}
      handleTileClick={App.handleTileClick}
      submitButtonState={true}
      locations={locations}
      userGameData={{}}
      resetMarker={App.resetMarker}
      mapMarkerStyle={{top: 0, left: 0}}
      mapMarker={null}
      handleCoordinateChoiceClick={App.handleCoordinateChoiceClick}
      deathMapMarker={[41, 42]}
      deathMapMarkerStyle={{top: '50%', left: '50%'}}
      userSettings={{}}
      handleDeathCoordinateChoiceClick={App.handleDeathCoordinateChoiceClick}
      checkDeathMarkerLocation={App.checkDeathMarkerLocation}
      loggedIn={false}
      statBoxFlashText={null}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});