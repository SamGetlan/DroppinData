import React from 'react';
import DashboardMap from './DashboardMap.jsx';


class StatDashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  // getDashboardData(games) {
  //   this.setState({
  //     loading: true,
  //   });
  //   let data = {
  //     totalGames: 0,
  //     totalKills: 0,
  //     totalPlace: 0,
  //     totalLoot: 0,
  //   };
  //   const getPlace = (game) => {
  //     if (game.gameType === 'solo') {
  //       return game.place;
  //     } else if (game.gameType === 'duo') {
  //       return game.place * 2;
  //     } else if (game.gameType === 'squad') {
  //       return game.place * 4;
  //     }
  //   }
  //   for (var i = 0; i < games.length; i++) {
  //     data.totalGames++;
  //     data.totalKills += games[i].kills;
  //     data.totalPlace += getPlace(games[i]);
  //     data.totalLoot += games[i].loot;
  //   }
  //   console.log('data:', data);
  //   this.setState({
  //     loading: false,
  //     data,
  //   })
  // }

  componentDidMount() {
    console.log('statDashboard mounting');
    if (this.props.filteredUserGames !== null && this.props.data === null) {
      console.log('inside conditional of statDasboard mounting');
      this.props.getDashboardData(this.props.filteredUserGames);
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
          <h1>Total Games: {(this.props.data !== null ? this.props.data.totalGames : 'N/A')}</h1>
          <h1>Average Place: {this.props.data !== null ? (Math.round((this.props.data.totalPlace / this.props.data.totalGames) * 100) / 100) : 'N/A'}</h1>
          <h1>Average Kills: {this.props.data !== null ? (Math.round((this.props.data.totalKills / this.props.data.totalGames) * 100) / 100) : 'N/A'}</h1>
          <h1>Average Loot: {this.props.data !== null ? (Math.round((this.props.data.totalLoot / this.props.data.totalGames) * 100) / 100) : 'N/A'}</h1>
        </div>}
        {this.props.filteredUserGames === null &&
        <div className="myGamesFlashTextContainer" >
          <h2>This account has no saved games!</h2>
        </div>}
        {this.props.statLoading &&
        <div className="loadingCenterScreen">
          <img src="/loading.gif" alt-src="loading image" height="100%" width="100%" />
        </div>}
      </div>
    );
  }
}


export default StatDashboard;