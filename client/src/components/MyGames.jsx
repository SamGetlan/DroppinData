import React from 'react';
import GameCard from './GameCard.jsx';
import FilterMyGames from './FilterMyGames.jsx';

class MyGames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredUserGames: (this.props.userGames !== null ? this.props.userGames.slice() : null),
      filterOptions: {
        startLocation: 'all',
        deathLocation: 'all',
        worstPlace: 100,
        bestPlace: 1,
        worstKills: 0,
        bestKills: 99,
        worstLoot: 0,
        bestLoot: 10,
        minDistanceTraveled: 0,
        maxDistanceTraveled: 3640,
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        timeStart: '00:00',
        timeEnd: '23:59',
      }
    };
  }

    

  render() {
    return (
      <div className="myGamesContainer">
        <FilterMyGames filterOptions={this.state.filterOptions}/>
        <div className="gameCardsContainer">
          {this.state.filteredUserGames !== null &&
            this.state.filteredUserGames.slice().reverse().map(game => <GameCard game={game} />)}
        </div>
      </div>
    );
  }
}

export default MyGames;