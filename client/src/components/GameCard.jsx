import React from 'react';
import moment from 'moment';

class GameCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDelete: false,
      editCard: false,
      location: this.props.game.location,
      place: this.props.game.place,
      kills: this.props.game.kills,
      loot: this.props.game.loot,
      date: this.props.game.date,
    };
    this.deleteGameCard = this.deleteGameCard.bind(this);
    this.editGameCard = this.editGameCard.bind(this);
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

  render() {
    return (
      <div className="gameCardContainer">
        <div className="gameCard">
          <div className="gameCardStats">
            {/* {this.state.editCard &&
            <div className="editableGameCardOverlay">
              <div className="editableGameCardStat editableGameCardLocation" >
                <select>
                  {this.props.locations.map(location => 
                    <option value={location.name} selected={location.name === this.state.location} >{location.name}</option>
                  )}
                </select>
              </div>
              <div className="editableGameCardStat editableGameCardQuickStats" >
                  <h4>Place?</h4><input id="placeInput" type="number" value={this.state.place} />
                  <h4>Kills?</h4><input id="killsInput" type="number" value={this.state.kills} />
                  <h4>Loot?</h4><input id="lootInput" type="number" value={this.state.loot} />
              </div>
              <div className="editableGameCardStat editableGameCardTime">
              </div>
            </div>} */}
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