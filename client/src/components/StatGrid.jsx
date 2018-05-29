import React from 'react';


const StatGrid = props => (
  <div className="statGridContainer">
    <div className="gridItem" />
    <div className="gridItem">Kills</div>
    <div className="gridItem">Place</div>
    <div className="gridItem">Loot</div>
    <div className="gridItem best">Best</div>
    <div className="gridItem best">{(props.stats && props.stats.averagePlace) ? props.stats.bestKills : 'N/A'}</div>
    <div className="gridItem best">{(props.stats && props.stats.averagePlace) ? props.stats.bestPlace : 'N/A'}</div>
    <div className="gridItem best">{(props.stats && props.stats.averagePlace) ? props.stats.bestLoot : 'N/A'}</div>
    <div className="gridItem average">Average</div>
    <div className="gridItem average">{(props.stats && props.stats.averagePlace) ? props.stats.averageKills : 'N/A'}</div>
    <div className="gridItem average">{(props.stats && props.stats.averagePlace) ? props.stats.averagePlace : 'N/A'}</div>
    <div className="gridItem average">{(props.stats && props.stats.averagePlace) ? props.stats.averageLoot : 'N/A'}</div>
    <div className="gridItem prev">Previous</div>
    <div className="gridItem prev">{(props.stats && props.stats.averagePlace) ? props.stats.recentKills : 'N/A'}</div>
    <div className="gridItem prev">{(props.stats && props.stats.averagePlace) ? props.stats.recentPlace : 'N/A'}</div>
    <div className="gridItem prev">{(props.stats && props.stats.averagePlace) ? props.stats.recentLoot : 'N/A'}</div>
  </div>
);

export default StatGrid;
