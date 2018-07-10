import React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App.jsx';
import UserForm from '../components/UserForm.jsx';
import { MemoryRouter } from 'react-router';

test('UserForm renders correctly', () => {
  const component = renderer.create(
    <MemoryRouter >
      <UserForm 
        handleUserFormClick={App.handleUserFormClick}
        signUpForm={false}
        loginUserFormOption={App.loginUserFormOption}
        signUpUserFormOption={App.signUpUserFormOption}
        handleAccountSignIn={App.handleAccountSignIn}
        handleAccountSignUp={App.handleAccountSignUp}
        logInFailed={null}
      />
    </MemoryRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});