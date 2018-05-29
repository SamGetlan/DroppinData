import React from 'react';
import { Link } from 'react-router-dom';

const AccountOptionsForm = props => (
  <div id="userFormContainerWrapper">
    <div id="userFormContainer">
      <button id="x"onClick={props.handleAccountOptionsClick} >X</button>
      <div id="userFormBox">
        <div id="accountOptionsButtonsContainer">
          <button id="accountSettingsButton" className="accountOptionsButton">Account Settings</button>
          <button id="myGamesButton" className="accountOptionsButton">My Games</button>
          <Link to="/home">
            <button id="logoutButton" className="accountOptionsButton" onClick={props.handleLogout} >Logout</button>
          </Link>
        </div>
      </div>
      <Link id="closeButtonContainer" to="/home">
        <button className="closeButton" onClick={props.handleAccountOptionsClick}>Close</button>
      </Link>
    </div>
  </div>
);

export default AccountOptionsForm;