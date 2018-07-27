import React from 'react';
import Tile from './Tile.jsx';

const BackSplash = props => (
  <div data-hint="Tiles will show quick stats about each location. You can also press on a tile to choose it as your drop location" id="backSplashContainerWrapper">
    <div id="backSplashContainer">
      {props.filteredLocations.map((location, index) =>
        <Tile 
          resetMarker={props.resetMarker}
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
