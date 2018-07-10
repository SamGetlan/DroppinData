import React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App.jsx';
import GameCardFull from '../components/GameCardFull.jsx';
import { MemoryRouter } from 'react-router';
import { game } from '../dummyData.js';
import locations from '../data.js';

global.document.getElementsByClassName = () => {
  return [{
    test: 'inside GameCardFull-test.js'
  }]
}

test('GameCardFull renders correctly', () => {
  const element = renderer.create(
    <MemoryRouter>
      <GameCardFull
        updateLocalGame={App.updateLocalGame} 
        closeEditGameCard={GameCardFull.editGameCard} 
        game={game} 
        editGameCard={GameCardFull.editGameCard} 
        locations={locations} 
        handleNotCompliantEditGameSubmission={App.handleNotCompliantEditGameSubmission}
      />
    </MemoryRouter>
  );
  let tree = element.toJSON();
  expect(tree).toMatchSnapshot();
});