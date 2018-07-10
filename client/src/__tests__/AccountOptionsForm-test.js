import React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App.jsx';
import AccountOptionsForm from '../components/AccountOptionsForm.jsx';
import { MemoryRouter } from 'react-router';

test('AccountOptionsForm renders correctly', () => {
  const component = renderer.create(
    <MemoryRouter>
      <AccountOptionsForm
        handleAccountOptionsClick={App.handleAccountOptionsClick}
        loggedIn={false}
        handleLogout={App.handleLogout}
        userSettings={{}}
        updateFilteredUserGames={App.updateFilteredUserGames}
      />
    </MemoryRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});