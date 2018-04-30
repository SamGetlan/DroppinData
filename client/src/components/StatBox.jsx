import React from 'react';
import Slider from 'react-rangeslider';
import StatGrid from './StatGrid.jsx';


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
    <StatGrid stats={props.stats} />
    <div className="entryContainer">
      <h3 className="inputLabel">What place did you come in?</h3> <input type="number" id="placeInput" />
    </div>
    <div className="entryContainer">
      <h3 className="inputLabel">How many kills did you have?</h3> <input type="number" id="killsInput" />
    </div>
    <div className="entryContainer">
      <h3 className="inputLabel">Rate your loot 1-10</h3> <input type="number" id="lootInput" />
    </div>
    <div id="gameTypeOptions">
      <input type="radio" value="solo" id="soloRadio" name="gameType" /><label htmlFor="soloRadio">Solo</label>
      <input type="radio" value="duo" id="duoRadio" name="gameType" /><label htmlFor="duoRadio">Duo</label>
      <input type="radio" value="squad" id="squadRadio" name="gameType" /><label htmlFor="squadRadio">Squad</label>
    </div>
    <div id="submitGameButtonContainer">
      <button id="submitGameButton" class={props.submitButtonState ? 'enabledButton' : 'disabledButton'} onClick={props.submitButtonState ? () => { props.handleSubmit(document.getElementById('placeInput').value, document.getElementById('killsInput').value, document.getElementById('lootInput').value, getSelectedGameType()); } : console.log('Button is temporary disabled')}>Submit Game</button>
    </div>
  </div>
);

export default StatBox;
