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
    };
    this.getStatsForActiveLocation = this.getStatsForActiveLocation.bind(this);
    this.changeGameType = this.changeGameType.bind(this);
  }


  getStatsForActiveLocation(location, gameType) {
    let totalKills = 0;
    let totalPlace = 0;
    let totalLoot = 0;
    let averageKills = 'N/A';
    let averagePlace = 'N/A';
    let mostRecentKills = 'N/A';
    let mostRecentPlace = 'N/A';
    let bestKills = 'N/A';
    let bestPlace = 'N/A';
    let averageLoot = 'N/A';
    let mostRecentLoot = 'N/A';
    let bestLoot = 'N/A';
    const relevantGames = [];
    const userGames = this.props.userGames;
    if (userGames === null) {
      return {
        averageKills,
        averagePlace,
        mostRecentKills,
        mostRecentPlace,
        bestKills,
        bestPlace,
        averageLoot,
        mostRecentLoot,
        bestLoot,
      };
    }
    if (gameType === 'all') {
      for (let i = 0; i < userGames.length; i++) {
        if (userGames[i].location === location.name) {
          if (bestLoot === 'N/A' || userGames[i].loot > bestLoot) {
            bestLoot = userGames[i].loot;
          }
          if (bestPlace === 'N/A' || userGames[i].place > bestPlace) {
            bestPlace = userGames[i].place;
          }
          if (bestKills === 'N/A' || userGames[i].kills > bestKills) {
            bestKills = userGames[i].kills;
          }
          totalKills += userGames[i].kills;
          if (userGames[i].gameType === 'squad') {
            totalPlace += (userGames[i].place * 4);
          } else if (userGames[i].gameType === 'duo') {
            totalPlace += (userGames[i].place * 2);
          } else {
            totalPlace += userGames[i].place;
          }
          totalLoot += userGames[i].loot;
          relevantGames.push(userGames[i]);
        }
      }
    } else {
      for (let i = 0; i < userGames.length; i++) {
        if (userGames[i].location === location.name && userGames[i].gameType === gameType) {
          if (bestLoot === 'N/A' || userGames[i].loot > bestLoot) {
            bestLoot = userGames[i].loot;
          }
          if (bestPlace === 'N/A' || userGames[i].place > bestPlace) {
            bestPlace = userGames[i].place;
          }
          if (bestKills === 'N/A' || userGames[i].kills > bestKills) {
            bestKills = userGames[i].kills;
          }
          totalKills += userGames[i].kills;
          totalPlace += userGames[i].place;
          totalLoot += userGames[i].loot;
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
        bestKills,
        bestPlace,
        averageLoot,
        mostRecentLoot,
        bestLoot,
      };
    }
    averageKills = Math.round((totalKills / relevantGames.length) * 10) / 10;
    averagePlace = Math.round((totalPlace / relevantGames.length) * 10) / 10;
    averageLoot = Math.round((totalLoot / relevantGames.length) * 10) / 10;
    const mostRecentGame = relevantGames.pop();
    mostRecentKills = mostRecentGame.kills;
    mostRecentPlace = mostRecentGame.place;
    mostRecentLoot = mostRecentGame.loot;
    return {
      averageKills,
      averagePlace,
      averageLoot,
      mostRecentKills,
      mostRecentPlace,
      mostRecentLoot,
      bestKills,
      bestPlace,
      bestLoot,
    };
  }

  changeGameType(gameType) {
    this.setState({
      gameType,
    });
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
