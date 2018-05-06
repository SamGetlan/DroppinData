import React from 'react';

const AccountOptionsForm = props => (
  <div id="userFormContainerWrapper">
    <div id="userFormContainer">
      <button id="x"onClick={props.handleAccountOptionsClick} >X</button>
      <div id="userFormBox">
        <div id="accountOptionsButtonsContainer">
          <button id="accountSettingsButton" className="accountOptionsButton">Account Settings</button>
          <button id="logoutButton" className="accountOptionsButton" onClick={props.handleLogout} >Logout</button>
        </div>
      </div>
      <div id="closeButtonContainer">
        <button className="closeButton" onClick={props.handleAccountOptionsClick}>Close</button>
      </div>
    </div>
  </div>
);

export default AccountOptionsForm;