import React from 'react';
import { Link } from 'react-router-dom';

class FullMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: '0px',
    }
  }

  componentDidMount() {
    const element = document.getElementsByClassName('imageButtonsContainer')[0];
    const width = (element.test === 'inside FullMap-test.js' ? '1000px' : window.getComputedStyle(element, null).getPropertyValue('width'));
    if (this.state.height !== width) {
      this.setState({
        height: width,
      })
    }
  }

  render() {
    return (
      <div id={this.props.userSettings.stormBackground ? "userFormContainerWrapper" : 'userFormContainerWrapperNoStorm'}>
        <div id="fullMapContainer">
          <div id="userFormBox">
            <div id="fullMap">
              <img className="fullMapImage" src="/locationPics/season5/season5fullMap.jpg" alt="Full Map" height="100%" width="100%"/>
              <div className="imageButtonsContainer" style={this.state}>
                {this.props.locations.map((location, i) => {
                  return <div key={`button${i}`} className="chooseLocationButton" id={location.camelCase} onClick={(e) => { this.props.handleMapChoiceClick(e); this.props.resetMarker(); } } />
                })}
              </div>
            </div>
          </div>
          <Link id="closeButtonContainer" to="/home">
            <button className="closeButton">Close</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default FullMap;