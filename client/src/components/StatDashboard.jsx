import React from 'react';


class StatDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="statDashbaordContainer">
        {this.props.filteredUserGames !== null &&
          <h1>Stat Dashboard goes here</h1>
        }
        {this.props.filteredUserGames === null &&
          <div className="myGamesFlashTextContainer" >
            <h2>This account has no saved games!</h2>
          </div>}
      </div>
    );
  }
}


export default StatDashboard;