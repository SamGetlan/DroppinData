import React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App.jsx';
import ActionButton from '../components/ActionButton.jsx';
import { MemoryRouter } from 'react-router';

test('ActionButton renders correctly', () => {
  const element = renderer.create(
    <MemoryRouter>
      <ActionButton
        resetMarker={App.resetMarker}
        handleActionClick={App.handleActionClick}
      />
    </MemoryRouter>
  );
  let tree = element.toJSON();
  expect(tree).toMatchSnapshot();
})