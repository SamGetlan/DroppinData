import React from 'react';


const StatGrid = props => (
  <div className="statGridContainer">
    <div className="gridItem" />
    <div className="gridItem">Kills</div>
    <div className="gridItem">Place</div>
    <div className="gridItem">Loot</div>
    <div className="gridItem best">Best</div>
    <div className="gridItem best">{props.stats.bestKills}</div>
    <div className="gridItem best">{props.stats.bestPlace}</div>
    <div className="gridItem best">{props.stats.bestLoot}</div>
    <div className="gridItem average">Average</div>
    <div className="gridItem average">{props.stats.averageKills}</div>
    <div className="gridItem average">{props.stats.averagePlace}</div>
    <div className="gridItem average">{props.stats.averageLoot}</div>
    <div className="gridItem prev">Previous</div>
    <div className="gridItem prev">{props.stats.mostRecentKills}</div>
    <div className="gridItem prev">{props.stats.mostRecentPlace}</div>
    <div className="gridItem prev">{props.stats.mostRecentLoot}</div>
  </div>
);

export default StatGrid;
