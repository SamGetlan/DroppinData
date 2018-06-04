import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorBlind: 'false',
    }
    this.handleColorBlindChange = this.handleColorBlindChange.bind(this);
  }


  handleColorBlindChange() {
    const colorBlind = (event.target.value === 'true' ? true : false)
    this.setState({
      colorBlind: event.target.value,
    })
  }

  render() {
    return (
      <div id="userFormContainerWrapper">
        <div id="userFormContainer">
          <div id="userFormBox">
          <div className="entryContainer">
              <h3 className="inputLabel">Color Blind?</h3> 
              <select id="colorBlindInput" onChange={this.handleColorBlindChange}>
                <option value="false">False</option>
                <option value="true">True</option>
              </select>
            </div>
            { /* <div className="entryContainer">
              <h3 className="inputLabel">Storm Background?</h3> 
              <select id="stormInput" onChange={this.handleChange}>
                <option value={this.state.stormBackground}>{this.state.stormBackground ? 'true' : 'false'}</option>
                {this.props.locations.map(location => <option value={location.camelCase}>{location.name}</option>)}
                <option value={!this.state.stormBackground}>{this.state.stormBackground ? 'false' : 'true'}</option>
              </select>
            </div>
            <div className="entryContainer">
              <h3 className="inputLabel">Location Tracking</h3> 
              <select id="locationTrackingInput" onChange={this.handleChange}>
                <option value={this.state.locationTrackingInput}>{this.state.locationTrackingInput === 'name' ? 'Location Name' : (this.state.locationTrackingInput === 'grid' ? 'Map Grid' : 'Map Coordinates')}</option>
                {this.props.locations.map(location => <option value={location.camelCase}>{location.name}</option>)}
                <option value={!this.state.stormBackground}>{this.state.locationTrackingInput === 'name' ? 'Map Grid' : (this.state.locationTrackingInput === 'grid' ? 'Map Coordinates' : 'Map Grid')}</option>
                <option value={!this.state.stormBackground}>{this.state.locationTrackingInput === 'name' ? 'Map Coordinates' : (this.state.locationTrackingInput === 'grid' ? 'Location Name' : 'Location Name')}</option>
              </select>
            </div> */}
          </div>
          <Link id="saveButtonContainer" to="/home">
            <button className="saveButton" onClick={() => this.props.applySettings(this.state)}>Apply</button>
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