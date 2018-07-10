import React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App.jsx';
import Stats from '../components/Stats.jsx';
import { MemoryRouter } from 'react-router';
import locations from '../data.js';

test('Stats renders correctly', () => {
  const element = renderer.create(
    <MemoryRouter>
      <Stats
        userGames={null}
        navButtons={['Home', 'Dashboard', 'My Games', 'Sign Up or Login']}
        classes={['home', 'dashboard', 'myGames', 'login']}
        handleUserFormClick={App.handleUserFormClick}
        loggedIn={false}
        handleAccountOptionsClick={App.handleAccountOptionsClick}
        confirmDeleteGameCard={App.confirmDeleteGameCard}
        filteredUserGames={null}
        filterOptions={{
          startLocation: 'All',
          deathLocation: 'All',
          worstPlace: 100,
          bestPlace: 1,
          worstKills: 0,
          bestKills: 99,
          worstLoot: 0,
          bestLoot: 10,
          minDistanceTraveled: 0,
          maxDistanceTraveled: 3640,
          days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          timeStart: '00:00',
          timeEnd: '23:59',
        }}
        updateFilteredUserGames={App.updateFilteredUserGames}
        locations={locations}
        updateLocalGame={App.updateLocalGame}
        handleFiltering={App.handleFiltering}
        handleNotCompliantEditGameSubmission={App.handleNotCompliantEditGameSubmission}
        dashboardData={null}
        statLoading={false}
        getDashboardData={App.getDashboardData}
        getPieChartData={App.getPieChartData}
        pieChartData={null}
      />
    </MemoryRouter>
  );
  let tree = element.toJSON();
  expect(tree).toMatchSnapshot();
});