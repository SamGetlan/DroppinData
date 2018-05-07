import React from 'react';

const FullMap = props => (
  <div id="userFormContainerWrapper">
    <div id="fullMapContainer">
      <button id="x"onClick={props.handleShowMapClick} >X</button>
      <div id="userFormBox">
        <div id="fullMap">
          <img className="fullMapImage" src="./fortNite-s4map.jpg" alt="Full Map" height="100%" width="100%"/>
          <div className="imageButtonsContainer">
            {props.locations.map((location, index, locations) => {
              return <div className="chooseLocationButton" id={location.camelCase} onClick={(e) => props.handleMapChoiceClick(e)} />
            })}
          </div>
        </div>
      </div>
      <div id="closeButtonContainer">
        <button className="closeButton" onClick={props.handleShowMapClick}>Close</button>
      </div>
    </div>
  </div>
)

export default FullMap;