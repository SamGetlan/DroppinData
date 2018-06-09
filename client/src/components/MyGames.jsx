import React from 'react';
import GameCard from './GameCard.jsx';
import FilterMyGames from './FilterMyGames.jsx';

class MyGames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

    

  render() {
    return (
      <div className="myGamesContainer">
        {this.props.filteredUserGames !== null &&
        (<div className="gameCardContainer">
          {this.props.filteredUserGames.slice().reverse().map(game => <GameCard game={game} />)}
        </div>)}
        {this.props.filteredUserGames === null &&
        <div className="myGamesFlashTextContainer" >
          <h2>This account has no saved games!</h2>
        </div>}
      </div>
    );
  }
}

export default MyGames;