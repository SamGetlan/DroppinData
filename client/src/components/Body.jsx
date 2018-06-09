import React from 'react';
import ActionButton from './ActionButton.jsx';
import BackSplash from './BackSplash.jsx';
import ActiveTile from './ActiveTile.jsx';
import StatBox from './StatBox.jsx';



class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameType: 'all',
      coordinateChoice: '',
    };
    this.changeGameType = this.changeGameType.bind(this);
  }


  changeGameType(gameType) {
    this.setState({
      gameType,
    });
  }

  checkActiveIsOk(active) {
    return this.props.filteredLocations.reduce((acc, curr) => {
      if (curr.camelCase === active) {
        acc = true;
      }
      return acc;
    }, false);
  }


  render() {
    return (
      <div>
        <ActionButton resetMarker={this.props.resetMarker} handleActionClick={this.props.handleActionClick} />
        {(this.props.active !== false && this.checkActiveIsOk(this.props.active)) &&
          <div className="activeTileContainer">
            <ActiveTile mapMarkerStyle={this.props.mapMarkerStyle} mapMarker={this.props.mapMarker} location={this.props.filteredLocations[this.props.activeIndex]} handleCoordinateChoiceClick={this.props.handleCoordinateChoiceClick}/>
            <StatBox 
              currentGameType={this.state.gameType} 
              changeGameType={this.changeGameType} 
              location={this.props.filteredLocations[this.props.activeIndex]} 
              handleSubmit={this.props.handleSubmit} 
              submitButtonState={this.props.submitButtonState} 
              locations={this.props.locations} 
              userGameData={this.props.userGameData}
              deathMapMarker={this.props.deathMapMarker}
              deathMapMarkerStyle={this.props.deathMapMarkerStyle}
              userSettings={this.props.userSettings}
              handleDeathCoordinateChoiceClick={this.props.handleDeathCoordinateChoiceClick}
              checkDeathMarkerLocation={this.props.checkDeathMarkerLocation}
              loggedIn={this.props.loggedIn}
            />
          </div>
        }
        <BackSplash 
          handleTileClick={this.props.handleTileClick} 
          resetMarker={this.props.resetMarker}
          userGames={this.props.userGames} 
          filteredLocations={this.props.filteredLocations} 
          userGameData={this.props.userGameData}
        />
      </div>
    );
  }
}

export default Body;
