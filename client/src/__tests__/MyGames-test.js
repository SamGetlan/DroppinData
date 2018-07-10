import React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App.jsx';
import MyGames from '../components/MyGames.jsx';
import { MemoryRouter } from 'react-router';
import locations from '../data.js'

test('MyGames renders correctly', () => {
  const element = renderer.create(
    <MemoryRouter>
      <MyGames
        userGames={null}
        filteredUserGames={null}
        confirmDeleteGameCard={App.confirmDeleteGameCard}
        locations={locations}
        updateLocalGame={App.updateLocalGame}
        handleNotCompliantEditGameSubmission={App.handleNotCompliantEditGameSubmission}
        statLoading={false}
      />
    </MemoryRouter>
  );
  let tree = element.toJSON();
  expect(tree).toMatchSnapshot();
});