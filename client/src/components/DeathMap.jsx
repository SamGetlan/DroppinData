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
    const width = window.getComputedStyle(element, null).getPropertyValue('width');
    if (this.state.height !== width) {
      this.setState({
        height: width,
      })
    }
  }

  render() {
    let gridSpots = [];
    for (var i = 0; i < 7056; i++) {
      gridSpots.push(<div className="chooseCoordinateButton" id={`gridSpot${i}`} onClick={(e) => this.props.handleCoordinateChoiceClick(e)} />);
    };


    return (
      <div id={this.props.userSettings.stormBackground ? "userFormContainerWrapper" : 'userFormContainerWrapperNoStorm'}>
        <div id="fullMapContainer">
          <div id="userFormBox">
            <div id="fullMap">
              <img className="fullMapImage" src="/locationPics/fortNite-s4map.jpg" alt="Full Map" height="100%" width="100%"/>
              {this.props.deathMapMarker && 
                <img id="deathMapMarker" alt={'Map Marker'} src={'/locationPics/MapMarker.png'} style={this.props.deathMapMarkerStyle}/>
              }
              <div className="imageButtonsContainer" style={this.state}>
                {gridSpots}
              </div>
            </div>
            <Link className="submitGameButtonContainer" to="/home">
              <button className={`submitGameButton ${this.props.submitButtonState ? 'enabledButton' : 'disabledButton'}`} onClick={this.props.submitGame}>Submit</button>
            </Link>
            <Link id="closeButtonContainer" to="/home">
              <button className="closeButton" >Close</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default FullMap;