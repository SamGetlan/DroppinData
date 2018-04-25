import React from 'react';


const StatGrid = props => (
  <div className="statGridContainer">
    <div className="gridItem" />
    <div className="gridItem">Kills</div>
    <div className="gridItem">Place</div>
    <div className="gridItem">Loot</div>
    <div className="gridItem best">Best</div>
    <div className="gridItem best">{props.kills.best}</div>
    <div className="gridItem best">{props.place.best}</div>
    <div className="gridItem best">{props.loot.best}</div>
    <div className="gridItem average">Average</div>
    <div className="gridItem average">{props.kills.average}</div>
    <div className="gridItem average">{props.place.average}</div>
    <div className="gridItem average">{props.loot.average}</div>
    <div className="gridItem prev">Previous</div>
    <div className="gridItem prev">{props.kills.prev}</div>
    <div className="gridItem prev">{props.place.prev}</div>
    <div className="gridItem prev">{props.loot.prev}</div>
  </div>
);

export default StatGrid;
