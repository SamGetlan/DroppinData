import React from 'react';
import DashboardMap from './DashboardMap.jsx';


class StatDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: null,
    };
  }

  getDashboardData(games) {
    this.setState({
      loading: true,
    });
    let data = {
      totalGames: 0,
      totalKills: 0,
      totalPlace: 0,
      totalLoot: 0,
    };
    const getPlace = (game) => {
      if (game.gameType === 'solo') {
        return game.place;
      } else if (game.gameType === 'duo') {
        return game.place * 2;
      } else if (game.gameType === 'squad') {
        return game.place * 4;
      }
    }
    for (var i = 0; i < games.length; i++) {
      data.totalGames++;
      data.totalKills += games[i].kills;
      data.totalPlace += getPlace(games[i]);
      data.totalLoot += games[i].loot;
    }
    console.log('data:', data);
    this.setState({
      loading: false,
      data,
    })
  }

  componentDidMount() {
    console.log('statDashboard mounting');
    if (this.props.filteredUserGames !== null && this.state.data === null) {
      console.log('inside conditional of statDasboard mounting');
      this.getDashboardData(this.props.filteredUserGames);
    }
  }

  render() {
    return (
      <div className="statDashboardContainer">
        {this.props.filteredUserGames !== null && 
        <DashboardMap filteredUserGames={this.props.filteredUserGames} />
        }
        {this.props.filteredUserGames !== null &&
        <div id="quickDashboardStats">
          <h1>Total Games: {(this.state.data !== null ? this.state.data.totalGames : 'N/A')}</h1>
          <h1>Average Place: {this.state.data !== null ? (Math.round((this.state.data.totalPlace / this.state.data.totalGames) * 100) / 100) : 'N/A'}</h1>
          <h1>Average Kills: {this.state.data !== null ? (Math.round((this.state.data.totalKills / this.state.data.totalGames) * 100) / 100) : 'N/A'}</h1>
          <h1>Average Loot: {this.state.data !== null ? (Math.round((this.state.data.totalLoot / this.state.data.totalGames) * 100) / 100) : 'N/A'}</h1>
        </div>}
        {this.props.filteredUserGames === null &&
        <div className="myGamesFlashTextContainer" >
          <h2>This account has no saved games!</h2>
        </div>}
        {this.state.loading &&
        <div className="loadingCenterScreen">
          <img src="/loading.gif" alt-src="loading image" height="100%" width="100%" />
        </div>}
      </div>
    );
  }
}


export default StatDashboard;