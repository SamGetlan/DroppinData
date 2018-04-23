import React from 'react';


const Tile = props => (
  <div className="tile">
    <p className="tileTitle" >{props.location.name}</p>
    <img className="mapImage" src={props.location.image} alt="map view of location" height="80%" width="100%" />
    <div className="tileStats">
      <span className="tileAvgPlace tileStat">Avg. Place:</span>
      <span className="tileAvgKills tileStat">Avg. Kills:</span>
    </div>
  </div>
);

export default Tile;
