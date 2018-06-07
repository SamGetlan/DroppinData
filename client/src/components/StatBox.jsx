import React from 'react';
import { Route, Link } from 'react-router-dom';
import StatGrid from './StatGrid.jsx';
import DeathMap from './DeathMap.jsx';

class StatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeInput: null,
      killsInput: null,
      lootInput: null,
      gameType: null,
    }
    this.handlePlaceInputChange = this.handlePlaceInputChange.bind(this);
    this.handleKillsInputChange = this.handleKillsInputChange.bind(this);
    this.handleLootInputChange = this.handleLootInputChange.bind(this);
    this.handleGameTypeOptionChange = this.handleGameTypeOptionChange.bind(this);
    this.handleNotReadySubmit = this.handleNotReadySubmit.bind(this);
  }

  handlePlaceInputChange(e) {
    this.setState({
      placeInput: e.target.value,
    });
  }

  handleKillsInputChange(e) {
    this.setState({
      killsInput: e.target.value,
    });
  }

  handleLootInputChange(e) {
    this.setState({
      lootInput: e.target.value,
    });
  }

  handleGameTypeOptionChange(e) {
    this.setState({
      gameType: e.target.value,
    });
  }

  handleNotReadySubmit() {
    if (this.state.placeInput < 1 || this.state.placeInput > 100 || this.state.placeInput === null) {
      console.log('Your place needs to be between 1 and 100');
    } else if (this.state.killsInput < 0 || this.state.killsInput > 99 || this.state.killsInput === null) {
      console.log('Your kills need to be between 0 and 99');
    } else if (this.state.lootInput < 0 || this.state.lootInput > 10 || this.state.lootInput === null) {
      console.log('Your loot rating needs to be between 0 and 10');
    } else if (this.state.gameType !== 'solo' && this.state.gameType !== 'duo' && this.state.gameType !== 'squad') {
      console.log('please select a game type');
    }
  }

  render() {
    return (
      <div className="statBox">
        <div className="temporaryGameTypeSelector">
          <span className={this.props.currentGameType === 'solo' ? 'selected gameTypeSelector' : 'gameTypeSelector'} onClick={() => this.props.changeGameType('solo')}>Solo</span><span className={this.props.currentGameType === 'duo' ? 'selected gameTypeSelector' : 'gameTypeSelector'} onClick={() => this.props.changeGameType('duo')} >Duo</span><span className={this.props.currentGameType === 'squad' ? 'selected gameTypeSelector' : 'gameTypeSelector'} onClick={() => this.props.changeGameType('squad')} >Squad</span><span className={this.props.currentGameType === 'all' ? 'selected gameTypeSelector' : 'gameTypeSelector'} onClick={() => this.props.changeGameType('all')} >All</span>
        </div>
        <StatGrid stats={this.props.userGameData[this.props.location.name] ? this.props.userGameData[this.props.location.name][this.props.currentGameType] : undefined} />
        <div className="entryContainer">
          <h3 className="inputLabel">What place did you come in?</h3> <input type="number" id="placeInput" onChange={(e) => this.handlePlaceInputChange(e)} />
        </div>
        <div className="entryContainer">
          <h3 className="inputLabel">How many kills did you have?</h3> <input type="number" id="killsInput" onChange={(e) => this.handleKillsInputChange(e)} />
        </div>
        <div className="entryContainer">
          <h3 className="inputLabel">Rate your loot 1-10</h3> <input type="number" id="lootInput" onChange={(e) => this.handleLootInputChange(e)} />
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
          <input type="radio" value="solo" id="soloRadio" name="gameType" checked={this.state.gameType === 'solo'} onChange={this.handleGameTypeOptionChange} /><label htmlFor="soloRadio">Solo</label>
          <input type="radio" value="duo" id="duoRadio" name="gameType" checked={this.state.gameType === 'duo'} onChange={this.handleGameTypeOptionChange} /><label htmlFor="duoRadio">Duo</label>
          <input type="radio" value="squad" id="squadRadio" name="gameType" checked={this.state.gameType === 'squad'} onChange={this.handleGameTypeOptionChange} /><label htmlFor="squadRadio">Squad</label>
        </div>
        {this.state.placeInput <= 100 && this.state.placeInput >= 1 && this.state.killsInput >= 0 && this.state.killsInput <= 99 && this.state.lootInput >= 0 && this.state.lootInput <= 10 && (this.state.gameType === 'solo' || this.state.gameType === 'duo' || this.state.gameType === 'squad') &&
        <Link className="submitGameButtonContainer" to="/home/deathLocation">
          <button className={`submitGameButton ${this.props.submitButtonState ? 'enabledButton' : 'disabledButton'}`} onClick={this.props.toggleDeathMap}>Submit Game</button>
        </Link>}
        {(this.state.placeInput <= 100 && this.state.placeInput >= 1 && this.state.killsInput >= 0 && this.state.killsInput <= 99 && this.state.lootInput >= 0 && this.state.lootInput <= 10 && (this.state.gameType === 'solo' || this.state.gameType === 'duo' || this.state.gameType === 'squad')) || 
        <div className="submitGameButtonContainer">
          <button className="submitGameButton disabledButton" onClick={this.handleNotReadySubmit} >Submit Game</button>
        </div>}
        <Route path="/home/deathLocation" render={props => <DeathMap {...props}
          submitButtonState={this.props.submitButtonState}
          handleCoordinateChoiceClick={this.props.handleDeathCoordinateChoiceClick}
          userSettings={this.props.userSettings}
          deathMapMarker={this.props.deathMapMarker}
          deathMapMarkerStyle={this.props.deathMapMarkerStyle}
          submitGame={this.props.submitButtonState ? () => { this.props.handleSubmit(this.state.placeInput, this.state.killsInput, this.state.lootInput, this.state.gameType); } : console.log('Button is temporary disabled')}
        />} />
      </div>
    );
  }
}

export default StatBox;
