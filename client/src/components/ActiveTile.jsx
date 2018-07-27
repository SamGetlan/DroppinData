import React from 'react';


class ActiveTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: '0px',
    }
  }

  componentDidUpdate() {
    const element = document.getElementsByClassName('activeImageButtonsContainer')[0];
    const width = window.getComputedStyle(element, null).getPropertyValue('width');
    if (this.state.height !== width) {
      this.setState({
        height: width,
      })
    }
  }
  render() {
    let gridSpots = [];
    for (var i = 0; i < 5184; i++) {
      gridSpots.push(<div key={`gs${i}`} className="chooseCoordinateButton" id={`gridSpot${i}`} onClick={(e) => this.props.handleCoordinateChoiceClick(e)} />);
    };
    
    return (
      <div data-position="right" data-step="2" data-intro="You can choose exactly where you are dropping in a location by pressing on the map and moving the marker" className={`tile ${this.props.location.name}`}>
        <p className="activeTileTitle">{this.props.location.name}</p>
        <div id="activeMapContainer">
          <img className="activeMapImage" alt={`Map of ${this.props.location.name}`} src={this.props.location.image} height="100%" width="100%"/>
          {this.props.mapMarker && 
            <img id="mapMarker" alt={'Map Marker'} src={'/locationPics/MapMarker.png'} style={this.props.mapMarkerStyle}/>
          }
          <div className="activeImageButtonsContainer" style={this.state}>
            {gridSpots}
          </div>
        </div>
      </div>
    );
  }
}

export default ActiveTile;
