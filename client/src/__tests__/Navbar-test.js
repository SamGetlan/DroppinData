import React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App.jsx';
import Navbar from '../components/Navbar.jsx';
import { MemoryRouter } from 'react-router';

test('Navbar renders correctly', () => {
  const element = renderer.create(
    <MemoryRouter>
      <Navbar
        navButtons={['Stats', 'Full Map', 'Filter Locations', 'Sign Up or Login']}
        classes={['stats', 'map', 'filter', 'login']}
        handleUserFormClick={App.handleUserFormClick}
        handleFilterClick={App.handleFilterClick}
        loggedIn={false}
        handleAccountOptionsClick={App.handleAccountOptionsClick}
        handleShowMapClick={App.handleShowMapClick}
        updateFilteredUserGames={App.updateFilteredUserGames}
      />
    </MemoryRouter>
  );
  let tree = element.toJSON();
  expect(tree).toMatchSnapshot();
});