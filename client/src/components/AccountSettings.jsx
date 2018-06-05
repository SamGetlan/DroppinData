import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorBlind: this.props.userSettings.colorBlind,
      stormBackground: this.props.userSettings.stormBackground,
      locationTracking: this.props.userSettings.locationTracking,
    }
    this.handleColorBlindChange = this.handleColorBlindChange.bind(this);
    this.handleStormBackgroundChange = this.handleStormBackgroundChange.bind(this);
    this.handleLocationTrackingChange = this.handleLocationTrackingChange.bind(this);
  }


  handleColorBlindChange() {
    this.setState({
      colorBlind: event.target.value,
    });
  }

  handleStormBackgroundChange() {
    this.setState({
      stormBackground: event.target.value,
    });
  }

  handleLocationTrackingChange() {
    const locationTracking = event.target.value;
    this.setState({
      locationTracking,
    })
  }

  render() {
    return (
      <div id={this.props.userSettings.stormBackground ? "userFormContainerWrapper" : 'userFormContainerWrapperNoStorm'}>        <div id="userFormContainer">
        <div id="userFormBox">
          <div className="entryContainer">
              <h3 className="inputLabel">Color Blind?</h3> 
              <select id="colorBlindInput" onChange={this.handleColorBlindChange} value={this.state.colorBlind}>
                <option value="false">False</option>
                <option value="true">True</option>
              </select>
            </div>
            <div className="entryContainer">
              <h3 className="inputLabel">Storm Background?</h3> 
              <select id="stormInput" onChange={this.handleStormBackgroundChange} value={this.state.stormBackground}>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <div className="entryContainer">
              <h3 className="inputLabel">Location Tracking</h3> 
              <select id="locationTrackingInput" value={this.state.locationTracking} onChange={this.handleLocationTrackingChange}>
                <option value='name'>Location Name</option>
                <option value='grid'>Map Grid</option>
                <option value='nameCoordinates'>Map Coordinates by Location Name</option>
                <option value='gridCoordinates'>Map Coordinates by Map Grid</option>
              </select>
            </div>
          </div>
          <Link id="saveButtonContainer" to="/home">
            <button id="saveSettingsButton" onClick={() => this.props.applySettings(this.state)}>Apply</button>
          </Link>
          <Link id="closeButtonContainer" to="/home">
            <button className="closeButton" >Close</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default AccountSettings;