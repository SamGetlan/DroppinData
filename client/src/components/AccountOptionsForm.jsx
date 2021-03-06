import React from 'react';
import { Link } from 'react-router-dom';

const AccountOptionsForm = props => (
  <div id={props.userSettings.stormBackground ? "userFormContainerWrapper" : 'userFormContainerWrapperNoStorm'}>
    <div id="userFormContainer">
      <div id="userFormBox">
        <div id="accountOptionsButtonsContainer">
          <Link id="accountSettingsButtonLink" className="accountOptionsButtonLink" to="/home/accountSettings">
            <button id="accountSettingsButton" className="accountOptionsButton">Account Settings</button>
          </Link>
          <Link to="/stats/myGames">
            <button id="myGamesButton" className="accountOptionsButton" onClick={props.updateFilteredUserGames}>My Games</button>
          </Link>
          <Link to="/home">
            <button id="introductionButton" className="accountOptionsButton" onClick={props.playIntroduction} >Replay Introduction</button>
          </Link>
          <Link to="/home">
            <button id="logoutButton" className="accountOptionsButton" onClick={props.handleLogout} >Logout</button>
          </Link>
        </div>
      </div>
      <Link id="closeButtonContainer" to="/home">
        <button className="closeButton">Close</button>
      </Link>
    </div>
  </div>
);

export default AccountOptionsForm;