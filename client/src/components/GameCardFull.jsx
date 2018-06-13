import React from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';



class GameCardFull extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editStartLocation: true,
      editEndLocation: false,
      startLocationMarker: this.props.game.startCoordinates,
      startLocationMarkerStyle: {
        top: `${(Math.floor(this.props.game.startCoordinates[0] / 3) + 0.5) * (100 / 84)}%`,
        left: `${(Math.floor(this.props.game.startCoordinates[1] / 3) + 0.5) * (100 / 84)}%`,
      },
      endLocationMarker: this.props.game.deathCoordinates,
      endLocationMarkerStyle: {
        top: `${(Math.floor(this.props.game.deathCoordinates[0]) + 0.5) * (100 / 84)}%`,
        left: `${(Math.floor(this.props.game.deathCoordinates[1]) + 0.5) * (100 / 84)}%`,
      },
      location: this.props.game.location,
      place: this.props.game.place,
      kills: this.props.game.kills,
      loot: this.props.game.loot,
      date: this.props.game.date,
      style: {
        height: '0px',
      },
    };
    this.handleEditEndLocationCoordinate = this.handleEditEndLocationCoordinate.bind(this);
    this.handleEditStartLocationCoordinate = this.handleEditStartLocationCoordinate.bind(this);
    this.alterEndLocation = this.alterEndLocation.bind(this);
    this.alterStartLocation = this.alterStartLocation.bind(this);
  }

  handleEditStartLocationCoordinate(e) {
    const gridSpot = Number(e.target.id.split('Spot')[1]);
    console.log('startGridSpot:', gridSpot);
    const rows = Math.floor(gridSpot / 84);
    const cols = (gridSpot % 84);
    console.log('startClickLocation:', [rows, cols]);
    const top = (`${(rows + 0.5) * (100 / 84)}%`);
    const left = (`${(cols + 0.5) * (100 / 84)}%`);
    this.setState({
      startLocationMarker: [rows, cols],
      startLocationMarkerStyle: {
        top,
        left,
      }
    });
  }

  handleEditEndLocationCoordinate(e) {
    const gridSpot = Number(e.target.id.split('Spot')[1]);
    console.log('deathGridSpot:', gridSpot);
    const rows = Math.floor(gridSpot / 84);
    const cols = (gridSpot % 84);
    console.log('deathClickLocation:', [rows, cols]);
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

  alterStartLocation() {
    console.log('inside alterStartLocation');
    this.setState({
      editStartLocation: true,
      editEndLocation: false,
    })
  }

  alterEndLocation() {
    console.log('inside alterEndLocation');
    this.setState({
      editStartLocation: false,
      editEndLocation: true,
    })
  }

  componentDidMount() {
    const element = document.getElementsByClassName('imageButtonsContainer')[0];
    const width = window.getComputedStyle(element, null).getPropertyValue('width');
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
                  <select>
                    {this.props.locations.map(location => 
                      <option value={location.name} selected={location.name === this.state.location} >{location.name}</option>
                    )}
                  </select>
                </div>
                <button id="saveEdits" onClick={this.editGameCardData}>Save Changes</button>
              </div>
              <div className="editableGameCardStat editableGameCardQuickStats" >
                  <div className="editableEntryContainer">
                    <h3 className="inputLabel">Place?</h3><input id="placeInput" type="number" value={this.state.place} />
                  </div>
                  <div className="editableEntryContainer">
                    <h3 className="inputLabel">Kills?</h3><input id="killsInput" type="number" value={this.state.kills} />
                  </div>
                  <div className="editableEntryContainer">
                  <h3 className="inputLabel">Loot?</h3><input id="lootInput" type="number" value={this.state.loot} />
                  </div>
              </div>
              <div className="editableGameCardStat editableGameCardTime">
                <img src="/calendarIcon.svg" alt-src="Date and Time" height="60%" width="50%" />
                <Datetime defaultValue={moment(this.props.game.date).calendar()}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GameCardFull;