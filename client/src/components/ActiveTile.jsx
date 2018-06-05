import React from 'react';


const ActiveTile = props => {
  let gridSpots = [];
  for (var i = 0; i < 576; i++) {
    gridSpots.push(<div className="chooseCoordinateButton" id={`gridSpot${i}`} onClick={(e) => props.handleCoordinateChoiceClick(e)} />);
  };

  return (
    <div className={`tile ${props.location}`}>
      <p className="activeTileTitle">{props.location.name}</p>
      <div id="activeMapContainer">
        <img className="activeMapImage" alt={`Map of ${props.location.name}`} src={props.location.image} height="100%" width="100%"/>
        <div className="activeImageButtonsContainer">
          {gridSpots}
        </div>
      </div>
    </div>
  );
};

export default ActiveTile;
