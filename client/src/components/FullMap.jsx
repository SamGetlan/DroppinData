import React from 'react';
import { Link } from 'react-router-dom';

const FullMap = props => (
  <div id="userFormContainerWrapper">
    <div id="fullMapContainer">
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
      <Link id="closeButtonContainer" to="/home">
        <button className="closeButton" onClick={props.handleShowMapClick}>Close</button>
      </Link>
    </div>
  </div>
)

export default FullMap;