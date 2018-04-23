import React from 'react';


const ActiveTile = props => (
  <div className={`tile ${props.location}`}>
    <p className="activeTileTitle">{props.location.name}</p>
    <img className="activeMapImage" alt={`Map of ${props.location.name}`} src={props.location.image} height="95%" width="95%" />
    <div className="activeTileStats">
      <span className="activeTileStat">Avg. Place: </span>
      <span className="activeTileStat">Avg. Kills: </span>
    </div>
  </div>
);

export default ActiveTile;
