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
      mapMarker: null,
      rows: null,
      cols: null,
      mapMarkerStyle: {
        display: 'hidden',
      }
    };
    this.changeGameType = this.changeGameType.bind(this);
    this.handleCoordinateChoiceClick = this.handleCoordinateChoiceClick.bind(this);
    this.resetMarker = this.resetMarker.bind(this);
  }


  componentDidUpdate() {   
    if (this.props.activeIndex !== false && (this.state.mapMarkerStyle.top !== `${(this.props.filteredLocations[this.props.activeIndex].start[0] + 0.5) * (100 / 72)}%` && this.state.mapMarkerStyle.top !== `${(this.state.rows + 0.5) * (100 / 72)}%`) && (this.state.mapMarkerStyle.left !== `${(this.props.filteredLocations[this.props.activeIndex].start[1] + 0.5) * (100 / 72)}%`) && this.state.mapMarkerStyle.left !== `${(this.state.cols + 0.5) * (100 / 72)}%`) {
      const location = this.props.filteredLocations[this.props.activeIndex];
      const rows = this.props.filteredLocations[this.props.activeIndex].start[0];
      const cols = this.props.filteredLocations[this.props.activeIndex].start[1];
      const getCoordinate = (location, rows, cols) => {
        const { topLeft } = location;
        return [(topLeft[0] + rows), (topLeft[1] + cols)];
      }
      this.setState({
        mapMarker: getCoordinate(location, rows, cols),
        mapMarkerStyle: {
          top: `${(this.props.filteredLocations[this.props.activeIndex].start[0] + 0.5) * (100 / 72)}%`,
          left: `${(this.props.filteredLocations[this.props.activeIndex].start[1] + 0.5) * (100 / 72)}%`,
        },
      });
    }
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

  resetMarker() {
    this.setState({
      mapMarkerStyle: {
        top: 0,
        left: 0,
      },
    });
  }

  handleCoordinateChoiceClick(e) {
    const location = this.props.filteredLocations[this.props.activeIndex];
    const gridSpot = Number(e.target.id.split('Spot')[1])
    console.log('gridSpot:', gridSpot);
    console.log('location:', location);
    const rows = Math.floor(gridSpot / 72);
    const cols = (gridSpot % 72);
    const getCoordinate = (location, rows, cols) => {
      const { topLeft } = location;
      return [(topLeft[0] + rows), (topLeft[1] + cols)];
    }
    console.log('clickLocation:', getCoordinate(location, rows, cols));
    const top = (`${(rows + 0.5) * (100 / 72)}%`);
    const left = (`${(cols + 0.5) * (100 / 72)}%`);
    console.log('rows:', rows);
    console.log('cols:', cols);
    console.log('top', top);
    console.log('left', left);
    this.setState({
      mapMarker: getCoordinate(location, rows, cols),
      rows,
      cols,
      mapMarkerStyle: {
        top,
        left,
      }
    });
  }


  render() {
    return (
      <div>
        <ActionButton resetMarker={this.resetMarker} handleActionClick={this.props.handleActionClick} />
        {(this.props.active !== false && this.checkActiveIsOk(this.props.active)) &&
          <div className="activeTileContainer">
            <ActiveTile mapMarkerStyle={this.state.mapMarkerStyle} mapMarker={this.state.mapMarker} location={this.props.filteredLocations[this.props.activeIndex]} handleCoordinateChoiceClick={this.handleCoordinateChoiceClick}/>
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
          resetMarker={this.resetMarker}
          userGames={this.props.userGames} 
          filteredLocations={this.props.filteredLocations} 
          userGameData={this.props.userGameData}
        />
      </div>
    );
  }
}

export default Body;
