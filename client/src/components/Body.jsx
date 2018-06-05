import React from 'react';
import ActionButton from './ActionButton.jsx';
import BackSplash from './BackSplash.jsx';
import ActiveTile from './ActiveTile.jsx';
import StatBox from './StatBox.jsx';

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameType: 'all',
      coordinateChoice: '',
    };
    this.changeGameType = this.changeGameType.bind(this);
    this.handleCoordinateChoiceClick = this.handleCoordinateChoiceClick.bind(this);
  }

  changeGameType(gameType) {
    this.setState({
      gameType,
    });
  }

  checkActiveIsOk(active) {
    return this.props.filteredLocations.reduce((acc, curr) => {
      if (curr.camelCase === active) {
        acc = true;
      }
      return acc;
    }, false);
  }

  handleCoordinateChoiceClick(e) {
    const location = this.props.filteredLocations[this.props.activeIndex];
    const gridSpot = Number(e.target.id.split('Spot')[1])
    console.log('gridSpot:', gridSpot);
    console.log('location:', location);
    const getCoordinate = (location, gridSpot) => {
      const { topLeft } = location;
      const rows = Math.floor(gridSpot / 26);
      const cols = (gridSpot % 26);
      return [(topLeft[0] + rows), (topLeft[1] + cols)];
    }

    console.log('clickLocation:', getCoordinate(location, gridSpot));
  }

  render() {
    return (
      <div>
        <ActionButton handleActionClick={this.props.handleActionClick} />
        {(this.props.active !== false && this.checkActiveIsOk(this.props.active)) &&
          <div className="activeTileContainer">
            <ActiveTile location={this.props.filteredLocations[this.props.activeIndex]} handleCoordinateChoiceClick={this.handleCoordinateChoiceClick}/>
            <StatBox 
              currentGameType={this.state.gameType} 
              changeGameType={this.changeGameType} 
              location={this.props.filteredLocations[this.props.activeIndex]} 
              handleSubmit={this.props.handleSubmit} 
              submitButtonState={this.props.submitButtonState} 
              locations={this.props.locations} 
              userGameData={this.props.userGameData}
            />
          </div>
        }
        <BackSplash 
          handleTileClick={this.props.handleTileClick} 
          userGames={this.props.userGames} 
          filteredLocations={this.props.filteredLocations} 
          userGameData={this.props.userGameData}
        />
      </div>
    );
  }
}

export default Body;
