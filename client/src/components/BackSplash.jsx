import React from 'react';
import Tile from './Tile.jsx';


class BackSplash extends React.Component {
  constructor(props) {
    super(props);
    this.getLocationData = this.getLocationData.bind(this);
  }

  getLocationData(location) {
    let totalKills = 0;
    let totalPlace = 0;
    let averageKills = 0;
    let averagePlace = 0;
    let relevantGames = [];
    const userGames = this.props.userGames;
    if (userGames === null) {
      return {
        averageKills,
        averagePlace,
      }
    }
    for (let i = 0; i < userGames.length; i++) {
      if (userGames[i].location === location.name) {
        totalKills += userGames[i].kills;
        totalPlace += userGames[i].place;
        relevantGames.push(userGames[i]);
      }
    }
    if (relevantGames.length < 1) {
      return {
        averageKills,
        averagePlace,
      }
    }
    averageKills = Math.round((totalKills / relevantGames.length) * 10) / 10;
    averagePlace = Math.round((totalPlace / relevantGames.length) * 10) / 10;
    return {
      averageKills,
      averagePlace,
    }
  }

  render() {
    return (
      <div id="backSplashContainerWrapper">
        <div id="backSplashContainer">
          {this.props.filteredLocations.map((location, index) =>
            <Tile handleTileClick={this.props.handleTileClick} key={`Loc${index}`} stats={this.getLocationData(location)} location={location} />)}
        </div>
      </div>
    );
  }
}

export default BackSplash;
