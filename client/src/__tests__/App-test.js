import React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App.jsx';
import { MemoryRouter } from 'react-router';

test('App renders correctly', () => {
  const element = renderer.create(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  let tree = element.toJSON();
  expect(tree).toMatchSnapshot();
});