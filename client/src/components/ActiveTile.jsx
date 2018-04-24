import React from 'react';


const ActiveTile = props => (
  <div className={`tile ${props.location}`}>
    <p className="activeTileTitle">{props.location.name}</p>
    <img className="activeMapImage" alt={`Map of ${props.location.name}`} src={props.location.image} />
  </div>
);

export default ActiveTile;
