import React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App.jsx';
import ResetPassword from '../components/ResetPassword.jsx';
import { MemoryRouter } from 'react-router';

test('ResetPassword renders correctly', () => {
  const element = renderer.create(
    <MemoryRouter>
      <ResetPassword
        handlePasswordReset={App.handlePasswordReset}
      />
    </MemoryRouter>
  );
  let tree = element.toJSON();
  expect(tree).toMatchSnapshot();
})