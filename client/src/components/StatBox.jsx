import React from 'react';

const gameTypes = document.getElementsByName('gameType');
const getSelectedGameType = () => {
  for (let i = 0; i < gameTypes.length; i++) {
    if (gameTypes[i].checked) {
      return gameTypes[i].value;
    }
  }
};

const StatBox = props => (
  <div className="statBox">
    <div className="temporaryGameTypeSelector">
      <span className={props.currentGameType === 'solo' ? 'selected gameTypeSelector' : 'gameTypeSelector'} onClick={() => props.changeGameType('solo')}>Solo</span><span className={props.currentGameType === 'duo' ? 'selected gameTypeSelector' : 'gameTypeSelector'} onClick={() => props.changeGameType('duo')} >Duo</span><span className={props.currentGameType === 'squad' ? 'selected gameTypeSelector' : 'gameTypeSelector'} onClick={() => props.changeGameType('squad')} >Squad</span><span className={props.currentGameType === 'all' ? 'selected gameTypeSelector' : 'gameTypeSelector'} onClick={() => props.changeGameType('all')} >All</span>
    </div>
    <h3>Avg. Place: {props.stats.averagePlace}</h3>
    <h3>Avg. Kills: {props.stats.averageKills}</h3>
    <h3>Most Recent Place: {props.stats.mostRecentPlace}</h3>
    <h3>Most Recent Kill Count: {props.stats.mostRecentKills}</h3>
    <h3>What place did you come in? </h3> <input type="number" id="placeInput" />
    <h3>How many kills did you have? </h3> <input type="number" id="killsInput" />
    <div id="gameTypeOptions">
      <input type="radio" value="solo" id="soloRadio" name="gameType" /><label htmlFor="soloRadio">Solo</label>
      <input type="radio" value="duo" id="duoRadio" name="gameType" /><label htmlFor="duoRadio">Duo</label>
      <input type="radio" value="squad" id="squadRadio" name="gameType" /><label htmlFor="squadRadio">Squad</label>
    </div>
    <button id="submitGameButton" onClick={() => { props.handleSubmit(document.getElementById('placeInput').value, document.getElementById('killsInput').value, getSelectedGameType()); }}>Submit Game</button>
  </div>
);

export default StatBox;
