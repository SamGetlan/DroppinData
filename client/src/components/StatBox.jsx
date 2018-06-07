import React from 'react';
import Slider from 'react-rangeslider';
import StatGrid from './StatGrid.jsx';
import DeathMap from './DeathMap.jsx';


const gameTypes = document.getElementsByName('gameType');
const getSelectedGameType = () => {
  for (let i = 0; i < gameTypes.length; i++) {
    if (gameTypes[i].checked) {
      return gameTypes[i].value;
    }
  }
};

class StatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deathLocation: "null",
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({deathLocation: event.target.value});
  }

  render() {
    return (
      <div className="statBox">
        <div className="temporaryGameTypeSelector">
          <span className={this.props.currentGameType === 'solo' ? 'selected gameTypeSelector' : 'gameTypeSelector'} onClick={() => this.props.changeGameType('solo')}>Solo</span><span className={this.props.currentGameType === 'duo' ? 'selected gameTypeSelector' : 'gameTypeSelector'} onClick={() => this.props.changeGameType('duo')} >Duo</span><span className={this.props.currentGameType === 'squad' ? 'selected gameTypeSelector' : 'gameTypeSelector'} onClick={() => this.props.changeGameType('squad')} >Squad</span><span className={this.props.currentGameType === 'all' ? 'selected gameTypeSelector' : 'gameTypeSelector'} onClick={() => this.props.changeGameType('all')} >All</span>
        </div>
        <StatGrid stats={this.props.userGameData[this.props.location.name] ? this.props.userGameData[this.props.location.name][this.props.currentGameType] : undefined} />
        <div className="entryContainer">
          <h3 className="inputLabel">What place did you come in?</h3> <input type="number" id="placeInput" />
        </div>
        <div className="entryContainer">
          <h3 className="inputLabel">How many kills did you have?</h3> <input type="number" id="killsInput" />
        </div>
        <div className="entryContainer">
          <h3 className="inputLabel">Rate your loot 1-10</h3> <input type="number" id="lootInput" />
        </div>
        {/* <div className="entryContainer">
          <h3 className="inputLabel">Where did you die?</h3> 
          <select id="deathInput" onChange={this.handleChange}>
            <option value="null"></option>
            {this.props.locations.map(location => <option value={location.camelCase}>{location.name}</option>)}
            <option value="betweenLocations">Between Locations</option>
            <option value="winner">I Won!</option>
          </select>
        </div> */}
        <div id="gameTypeOptions">
          <input type="radio" value="solo" id="soloRadio" name="gameType" /><label htmlFor="soloRadio">Solo</label>
          <input type="radio" value="duo" id="duoRadio" name="gameType" /><label htmlFor="duoRadio">Duo</label>
          <input type="radio" value="squad" id="squadRadio" name="gameType" /><label htmlFor="squadRadio">Squad</label>
        </div>
        <div className="submitGameButtonContainer">
          <button className={`submitGameButton ${this.props.submitButtonState ? 'enabledButton' : 'disabledButton'}`} onClick={this.props.toggleDeathMap}>Submit Game</button>
        </div>
        {this.props.showDeathMap &&
          <DeathMap submitButtonState={this.props.submitButtonState} handleCoordinateChoiceClick={this.props.handleDeathCoordinateChoiceClick} userSettings={this.props.userSettings} toggleDeathMap={this.props.toggleDeathMap} deathMapMarker={this.props.deathMapMarker} deathMapMarkerStyle={this.props.deathMapMarkerStyle} submitGame={this.props.submitButtonState ? () => { this.props.handleSubmit(document.getElementById('placeInput').value, document.getElementById('killsInput').value, document.getElementById('lootInput').value, getSelectedGameType()); } : console.log('Button is temporary disabled')} />
        }
      </div>
    );
  }
}

export default StatBox;
