import React from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import axios from 'axios';



class GameCardFull extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editStartLocation: true,
      editEndLocation: false,
      originalStartLocationMarker: this.props.game.startCoordinates,
      startLocationMarker: this.props.game.startCoordinates,
      startLocationMarkerStyle: {
        top: `${(Math.floor(this.props.game.startCoordinates[0] / 3) + 0.5) * (100 / 84)}%`,
        left: `${(Math.floor(this.props.game.startCoordinates[1] / 3) + 0.5) * (100 / 84)}%`,
      },
      originalEndLocationMarker: this.props.game.deathCoordinates,
      endLocationMarker: this.props.game.deathCoordinates,
      endLocationMarkerStyle: {
        top: `${(Math.floor(this.props.game.deathCoordinates[0]) + 0.5) * (100 / 84)}%`,
        left: `${(Math.floor(this.props.game.deathCoordinates[1]) + 0.5) * (100 / 84)}%`,
      },
      originalLocation: this.props.game.location,
      location: this.props.game.location,
      originalPlace: this.props.game.place,
      place: this.props.game.place,
      originalKills: this.props.game.kills,
      kills: this.props.game.kills,
      originalLoot: this.props.game.loot,
      loot: this.props.game.loot,
      originalDate: this.props.game.date,
      gameType: this.props.game.gameType,
      originalGameType: this.props.game.gameType,
      date: this.props.game.date,
      style: {
        height: '0px',
      },
      suggestion: null,
    };
    this.handleEditEndLocationCoordinate = this.handleEditEndLocationCoordinate.bind(this);
    this.handleEditStartLocationCoordinate = this.handleEditStartLocationCoordinate.bind(this);
    this.alterEndLocation = this.alterEndLocation.bind(this);
    this.alterStartLocation = this.alterStartLocation.bind(this);
    this.handleEditLocation = this.handleEditLocation.bind(this);
    this.handleEditPlace = this.handleEditPlace.bind(this);
    this.handleEditKills = this.handleEditKills.bind(this);
    this.handleEditLoot = this.handleEditLoot.bind(this);
    this.handleEditDate = this.handleEditDate.bind(this);
    this.handleGameTypeOptionChange = this.handleGameTypeOptionChange.bind(this);
    this.submitChanges = this.submitChanges.bind(this);
  }

  handleEditStartLocationCoordinate(e) {
    const gridSpot = Number(e.target.id.split('Spot')[1]);
    const rows = Math.floor(gridSpot / 84);
    const cols = (gridSpot % 84);
    const top = (`${(rows + 0.5) * (100 / 84)}%`);
    const left = (`${(cols + 0.5) * (100 / 84)}%`);
    this.setState({
      startLocationMarker: [(rows * 3), (cols * 3)],
      startLocationMarkerStyle: {
        top,
        left,
      }
    });
  }

  handleEditEndLocationCoordinate(e) {
    const gridSpot = Number(e.target.id.split('Spot')[1]);
    const rows = Math.floor(gridSpot / 84);
    const cols = (gridSpot % 84);
    const top = (`${(rows + 0.5) * (100 / 84)}%`);
    const left = (`${(cols + 0.5) * (100 / 84)}%`);
    this.setState({
      endLocationMarker: [rows, cols],
      endLocationMarkerStyle: {
        top,
        left,
      }
    });
  }

  handleEditLocation(e) {
    this.setState({
      location: e.target.value,
    });
  }

  handleEditPlace(e) {
    this.setState({
      place: Number(e.target.value),
    });
  }

  handleEditKills(e) {
    this.setState({
      kills: Number(e.target.value),
    });
  }

  handleEditLoot(e) {
    this.setState({
      loot: Number(e.target.value),
    });
  }

  handleEditDate(date) {
    this.setState({
      date: date._d,
    });
  }

  handleGameTypeOptionChange(e) {
    this.setState({
      gameType: e.target.value,
    });
  }

  alterStartLocation() {
    this.setState({
      editStartLocation: true,
      editEndLocation: false,
    });
  }

  alterEndLocation() {
    this.setState({
      editStartLocation: false,
      editEndLocation: true,
    });
  }

  submitChanges() {
    const context = this;
    if (this.state.place >= 1 && this.state.place <= 100 && this.state.kills >= 0 && this.state.kills <= 99 && this.state.loot <= 10 && this.state.loot >= 0) {
      axios.put(`/api/games/${this.props.game._id}`, {
        startCoordinates: [(context.state.startLocationMarker[0]), (context.state.startLocationMarker[1])],
        deathCoordinates: context.state.endLocationMarker,
        date: context.state.date,
        location: context.state.location,
        place: context.state.place,
        kills: context.state.kills,
        loot: context.state.loot,
        gameType: context.state.gameType,
        stormDeath: context.state.stormDeath,
      })
        .then((data) => {
          context.props.updateLocalGame(this.props.game._id, {
            startCoordinates: [(context.state.startLocationMarker[0]), (context.state.startLocationMarker[1])],
            deathCoordinates: context.state.endLocationMarker,
            date: context.state.date,
            location: context.state.location,
            place: context.state.place,
            kills: context.state.kills,
            loot: context.state.loot,
            gameType: context.state.gameType,
            stormDeath: context.state.stormDeath,
          })
          context.props.editGameCard();
        })
        .catch((err) => {
          console.log('there was an error updating game:', err);
        });
    } else {
      this.props.handleNotCompliantEditGameSubmission(this.state.place, this.state.kills, this.state.loot);
    }
  }

  componentDidMount() {
    const element = document.getElementsByClassName('imageButtonsContainer')[0];
    const width = (element.test === 'inside GameCardFull-test.js' ? '1000px' : window.getComputedStyle(element, null).getPropertyValue('width'));
    if (this.state.style.height !== width) {
      this.setState({
        style: {
          height: width,
        },
      });
    }
  }

  render() {
    let gridSpots = [];
    for (var i = 0; i < 7056; i++) {
      gridSpots.push(<div className="chooseCoordinateButton" id={`gridSpot${i}`} onClick={(this.state.editStartLocation ? (e) => this.handleEditStartLocationCoordinate(e) : (e) => this.handleEditEndLocationCoordinate(e))} />);
    };

    return (
      <div id="userFormContainerWrapperNoStorm">
        <div id="fullMapContainer">
          <div id="userFormBox">
            <div id="userFormOptionsBar">
              <button className="userFormOptionsButton" id="editStartLocation" onClick={this.alterStartLocation}>Start Location</button>
              <button className="userFormOptionsButton" id="editEndLocation" onClick={this.alterEndLocation}>End Location</button>
            </div>
            <div id="fullMap">
              <img className="fullMapImage" src="/locationPics/fullMapSmall.jpg" alt="Full Map" height="100%" width="100%"/>
              {this.state.editStartLocation && 
                <img id="deathMapMarker" alt={'Map Marker'} src={'/locationPics/MapMarker.png'} style={this.state.startLocationMarkerStyle}/>
              }
              {this.state.editEndLocation &&
                <img id="deathMapMarker" alt={'Map Marker'} src={'/locationPics/MapMarker.png'} style={this.state.endLocationMarkerStyle}/>
              }
              <div className="imageButtonsContainer" style={this.state.style}>
                {gridSpots}
              </div>
            </div>
            <div className="gameCardFullContainer">
              <div className="editableGameCardStat editableGameCardLocation" >
                <div className="editableStartLocationName">
                  <h3>Start Location</h3>
                  <select onChange={(e) => this.handleEditLocation(e)}>
                    {this.props.locations.map((location, index) => 
                      <option key={`SL${index}`} value={location.name} selected={location.name === this.state.location} >{location.name}</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="editableGameCardStat editableGameCardQuickStats" >
                  <div className="editableEntryContainer">
                    <h3 className="inputLabel">Place?</h3><input id="placeInput" type="number" defaultValue={this.state.place} onChange={(e) => this.handleEditPlace(e)} />
                  </div>
                  <div className="editableEntryContainer">
                    <h3 className="inputLabel">Kills?</h3><input id="killsInput" type="number" defaultValue={this.state.kills} onChange={(e) => this.handleEditKills(e)} />
                  </div>
                  <div className="editableEntryContainer">
                  <h3 className="inputLabel">Loot?</h3><input id="lootInput" type="number" defaultValue={this.state.loot} onChange={(e) => this.handleEditLoot(e)} />
                  </div>
              </div>
              <div className="editableGameCardStat editableGameCardTime">
                <img src="/calendarIcon.svg" alt-src="Date and Time" height="60%" width="50%" />
                <Datetime defaultValue={moment(this.props.game.date).calendar()} onChange={this.handleEditDate}/>
              </div>
              <div className="editableButtonsContainer">
                <div id="gameTypeOptions">
                  <input type="radio" value="solo" id="soloRadio" name="gameType" checked={this.state.gameType === 'solo'} onChange={this.handleGameTypeOptionChange} /><label htmlFor="soloRadio">Solo</label>
                  <input type="radio" value="duo" id="duoRadio" name="gameType" checked={this.state.gameType === 'duo'} onChange={this.handleGameTypeOptionChange} /><label htmlFor="duoRadio">Duo</label>
                  <input type="radio" value="squad" id="squadRadio" name="gameType" checked={this.state.gameType === 'squad'} onChange={this.handleGameTypeOptionChange} /><label htmlFor="squadRadio">Squad</label>
                </div>
                <button id="saveEdits" onClick={this.submitChanges}>Save Changes</button>         
                <button className="closeButton" onClick={this.props.editGameCard}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GameCardFull;