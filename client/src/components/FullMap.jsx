import React from 'react';

const FullMap = props => (
  <div id="userFormContainerWrapper">
    <div id="userFormContainer">
      <button id="x"onClick={props.handleShowMapClick} >X</button>
      <div id="userFormBox">
        <div id="accountOptionsButtonsContainer">
          <img className="fullMap" src="./fortNite-s4map.jpg" alt="Full Map" height="100%" width="100%" />
        </div>
      </div>
      <div id="closeButtonContainer">
        <button className="closeButton" onClick={props.handleShowMapClick}>Close</button>
      </div>
    </div>
  </div>
)

export default FullMap;