import React from 'react';
import GameCard from './GameCard.jsx';

const MyGames = props => (
  <div className="myGamesContainer">
    {props.filteredUserGames !== null &&
      props.filteredUserGames.slice().map(game => <GameCard updateLocalGame={props.updateLocalGame}game={game} locations={props.locations} confirmDeleteGameCard={props.confirmDeleteGameCard} confirmDeleteGameCardFilteredList={props.confirmDeleteGameCardFilteredList} handleNotCompliantEditGameSubmission={props.handleNotCompliantEditGameSubmission} />)}
    {props.filteredUserGames === null &&
    <div className="myGamesFlashTextContainer" >
      <h2>This account has no saved games!</h2>
    </div>}
  </div>
);

export default MyGames;