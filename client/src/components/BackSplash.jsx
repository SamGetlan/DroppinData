import React from 'react';
import Tile from './Tile.jsx';

const BackSplash = props => (
  <div id="backSplashContainerWrapper">
    <div id="backSplashContainer">
      {props.filteredLocations.map((location, index) =>
        <Tile 
          handleTileClick={props.handleTileClick} 
          key={`Loc${index}`} 
          stats={props.userGameData[location.name] ? props.userGameData[location.name].all : {averagePlace: 'N/A', averageKills: 'N/A'}} 
          location={location} 
        />
      )}
    </div>
  </div>
);

export default BackSplash;
