import React from 'react';
import Tile from './Tile.jsx';

const BackSplash = props => (
  <div id="backSplashContainerWrapper">
    <div id="backSplashContainer">
      {props.filteredLocations.map((location, index) =>
        <Tile key={`Loc${index}`} location={location} />)}
    </div>
  </div>
);

export default BackSplash;
