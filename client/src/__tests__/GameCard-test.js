import React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App.jsx';
import GameCard from '../components/GameCard.jsx';
import { MemoryRouter } from 'react-router';
import { game } from '../dummyData.js';
import locations from '../data.js';

test('GameCard renders correctly', () => {
  const element = renderer.create(
    <MemoryRouter>
      <GameCard
        updateLocalGame={App.updateLocalGame}
        game={game} 
        locations={locations} 
        confirmDeleteGameCard={App.confirmDeleteGameCard} 
        confirmDeleteGameCardFilteredList={App.confirmDeleteGameCardFilteredList}
        handleNotCompliantEditGameSubmission={App.handleNotCompliantEditGameSubmission}
      />
    </MemoryRouter>
  );
  let tree = element.toJSON();
  expect(tree).toMatchSnapshot();
});