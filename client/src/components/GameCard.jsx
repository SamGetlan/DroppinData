import React from 'react';
import moment from 'moment';
import GameCardFull from './GameCardFull.jsx';

class GameCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDelete: false,
      editCard: false,
    };
    this.deleteGameCard = this.deleteGameCard.bind(this);
    this.editGameCard = this.editGameCard.bind(this);
  }

  deleteGameCard() {
    this.setState({
      confirmDelete: !this.state.confirmDelete,
    });
  }

  editGameCard() {
    this.setState({
      editCard: !this.state.editCard,
    });
  }


  render() {
    return (
      <div className="gameCardContainer flex-item">
        <div className="gameCard">
          <div className="gameCardStats">
            {this.state.editCard &&
            <GameCardFull updateLocalGame={this.props.updateLocalGame} closeEditGameCard={this.editGameCard} game={this.props.game} editGameCard={this.editGameCard} locations={this.props.locations} handleNotCompliantEditGameSubmission={this.props.handleNotCompliantEditGameSubmission} />}
            <div className={(this.state.confirmDelete ? 'confirmDeleteGameCardOverlay stretchLeft' : 'confirmDeleteGameCardOverlay hidden')} >
              <h2>Are you sure you wish to delete this game?</h2>
              <div className="confirmDeleteGameCardButtonsContainer">
                <button className="confirmDeleteGameCardButton confirmDeleteButton" onClick={() => { this.props.confirmDeleteGameCard(this.props.game._id); this.deleteGameCard(); }}>Yes</button>
                <button className="cancelDeleteGameCardButton confirmDeleteButton" onClick={this.deleteGameCard}>No</button>
              </div>
            </div>
            <div className="gameCardStat gameCardLocationContainer">
              <h2>{this.props.game.location}</h2>
            </div>
            <div className="gameCardStat gameCardQuickStatsContainer">
              <h3>Place: {this.props.game.place}</h3>
              <h3>Kills: {this.props.game.kills}</h3>
              <h3>Loot: {this.props.game.loot}</h3>
            </div>
            <div className="gameCardStat gameCardTimeContainer">
              <h2>{moment(this.props.game.date).calendar()}</h2>
            </div>
            <div className="gameCardOptionsContainer">
              <div className="gameCardDeleteButton gameCardOptionButton">
                <img className="trashIcon" alt="delete" src="/trashBin.png" height="100%" width="100%" onClick={this.deleteGameCard} />
              </div>
              <div className="gameCardEditButton gameCardOptionButton">
                <img className="editIcon" alt="edit" src="/editIcon.png" height="80%" width="80%" onClick={this.editGameCard}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GameCard;