import React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App.jsx';
import AccountRecovery from '../components/AccountRecovery.jsx';
import { MemoryRouter } from 'react-router';

test('AccountRecovery renders correctly', () => {
  const element = renderer.create(
    <MemoryRouter>
      <AccountRecovery
        handleRecoveryAttempt={App.handleRecoveryAttempt}
      />
    </MemoryRouter>
  );
  let tree = element.toJSON();
  expect(tree).toMatchSnapshot();
})

