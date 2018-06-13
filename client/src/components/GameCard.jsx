import React from 'react';
import moment from 'moment';
import GameCardFull from './GameCardFull.jsx';

class GameCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDelete: false,
      editCard: false,
      editDateTime: false,
      // location: this.props.game.location,
      // place: this.props.game.place,
      // kills: this.props.game.kills,
      // loot: this.props.game.loot,
      // date: this.props.game.date,
    };
    this.deleteGameCard = this.deleteGameCard.bind(this);
    this.editGameCard = this.editGameCard.bind(this);
    this.editDateTime = this.editDateTime.bind(this);
    this.editGameCardData = this.editGameCardData.bind(this);
  }

  deleteGameCard() {
    console.log('inside delete');
    this.setState({
      confirmDelete: !this.state.confirmDelete,
    });
  }

  editGameCard() {
    console.log('inside edit');
    this.setState({
      editCard: !this.state.editCard,
    });
  }

  editDateTime() {
    console.log('inside editDateTime');
    this.setState({
      editDateTime: !this.state.editDateTime,
    });
  }

  editGameCardData() {
    console.log('inside editGameCardData');
    console.log('location:', this.state.location);
    console.log('place:', this.state.place);
    console.log('kills:', this.state.kills);
    console.log('loot:', this.state.loot);
    console.log('date:', this.state.date);
    // axios.put('/api/games', {
    //   location: this.state.location,
    //   place: this.state.place,
    //   kills: this.state.kills,
    //   loot: this.state.loot,
    //   date: this.state.date,  
    // })
  }

  render() {
    return (
      <div className="gameCardContainer">
        <div className="gameCard">
          <div className="gameCardStats">
            {this.state.editCard &&
            <GameCardFull game={this.props.game} locations={this.props.locations} />}
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