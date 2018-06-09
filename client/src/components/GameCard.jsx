import React from 'react';
import moment from 'moment';

class GameCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="gameCardContainer">
        <div className="gameCard">
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
              <img className="trashIcon" alt="delete" src="/trashBin.png" height="100%" width="100%" />
            </div>
            <div className="gameCardEditButton gameCardOptionButton">
              <img className="editIcon" alt="edit" src="/editIcon.png" height="80%" width="80%" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GameCard;