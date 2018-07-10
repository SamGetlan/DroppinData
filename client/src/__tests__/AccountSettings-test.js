import React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App.jsx';
import AccountSettings from '../components/AccountSettings.jsx';
import { MemoryRouter } from 'react-router';

test('AccountSettings renders correctly', () => {
  const element = renderer.create(
    <MemoryRouter>
      <AccountSettings
        applySettings={App.applySettings}
        userSettings={{}}
      />
    </MemoryRouter>
  );
  let tree = element.toJSON();
  expect(tree).toMatchSnapshot();
});