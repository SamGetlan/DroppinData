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
    }
    this.getStatsForActiveLocation = this.getStatsForActiveLocation.bind(this);
    this.changeGameType = this.changeGameType.bind(this);
  }

  changeGameType(gameType) {
    this.setState({
      gameType,
    });
  }

  getStatsForActiveLocation(location, gameType) {
    let totalKills = 0;
    let totalPlace = 0;
    let averageKills = 0;
    let averagePlace = 0;
    let mostRecentKills = 0;
    let mostRecentPlace = 0;
    let relevantGames = [];
    const userGames = this.props.userGames;
    if (userGames === null) {
      return {
        averageKills,
        averagePlace,
        mostRecentKills,
        mostRecentPlace,
      }
    }
    if (gameType === 'all') {
      for (let i = 0; i < userGames.length; i++) {
        if (userGames[i].location === location.name) {
          totalKills += userGames[i].kills;
          totalPlace += userGames[i].place;
          relevantGames.push(userGames[i]);
        }
      }
    } else {
      for (let i = 0; i < userGames.length; i++) {
        if (userGames[i].location === location.name && userGames[i].gameType === gameType) {
          totalKills += userGames[i].kills;
          totalPlace += userGames[i].place;
          relevantGames.push(userGames[i]);
        }
      }
    }
    if (relevantGames.length < 1) {
      return {
        averageKills,
        averagePlace,
        mostRecentKills,
        mostRecentPlace,
      }
    }
    averageKills = Math.round((totalKills / relevantGames.length) * 10) / 10;
    averagePlace = Math.round((totalPlace / relevantGames.length) * 10) / 10;
    const mostRecentGame = relevantGames.pop();
    mostRecentKills = mostRecentGame.kills;
    mostRecentPlace = mostRecentGame.place;
    return {
      averageKills,
      averagePlace,
      mostRecentKills,
      mostRecentPlace,
    }
  }

  render() {
    return (
      <div>
        <ActionButton handleActionClick={this.props.handleActionClick} />
        {this.props.active !== false &&
          <div className="activeTileContainer">
            <ActiveTile location={this.props.filteredLocations[this.props.activeIndex]} />
            <StatBox currentGameType={this.state.gameType} changeGameType={this.changeGameType} stats={this.getStatsForActiveLocation(this.props.filteredLocations[this.props.activeIndex], this.state.gameType)} handleSubmit={this.props.handleSubmit} />
          </div>
        }
        <BackSplash handleTileClick={this.props.handleTileClick} userGames={this.props.userGames} filteredLocations={this.props.filteredLocations} />
      </div>
    );
  }
}

export default Body;
