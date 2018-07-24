import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import PurpleCheckBox from './PurpleCheckBox.jsx';

class FilterMyGames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilterStatsOptions: false,
      gameType: ['solo', 'duo', 'squad'],
      startLocation: this.props.locations.map(location => location.name),
      deathLocation: 'All',
      seasons: [5],
      worstPlace: 100,
      bestPlace: 1,
      minKills: 0,
      maxKills: 99,
      minLoot: 0,
      maxLoot: 10,
      minDistanceTraveled: 0,
      maxDistanceTraveled: 3640,
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      timeStart: '00:00',
      timeEnd: '23:59',
    }
    this.handleStartLocationChange = this.handleStartLocationChange.bind(this);
    this.handleDeathLocationChange = this.handleDeathLocationChange.bind(this);
    this.handlePlaceChange = this.handlePlaceChange.bind(this);
    this.handleKillsChange = this.handleKillsChange.bind(this);
    this.handleLootChange = this.handleLootChange.bind(this);
    this.handleDistanceTraveledChange = this.handleDistanceTraveledChange.bind(this);
    this.handleDaysOfTheWeekChange = this.handleDaysOfTheWeekChange.bind(this);
    this.handleTimeRangeChange = this.handleTimeRangeChange.bind(this);
    this.renderStartLocation = this.renderStartLocation.bind(this);
    this.renderGameType = this.renderGameType.bind(this);
    this.toggleShowFilterStatsOptions = this.toggleShowFilterStatsOptions.bind(this);
    this.stopPropagation = this.stopPropagation.bind(this);
    this.renderSeasons = this.renderSeasons.bind(this);
  }

  toggleShowFilterStatsOptions() {
    this.setState({
      showFilterStatsOptions: !this.state.showFilterStatsOptions,
    })
  }
  
  handleStartLocationChange(startLocation) {
    console.log('inside handleStartLocationChange:', startLocation);
    if (startLocation.indexOf('All') > -1) {
      console.log('startLocationAll');
      if (this.state.startLocation.length === this.props.locations.length) {
        this.setState({
          startLocation: [],
        });
      } else {
        this.setState({
          startLocation: this.props.locations.map(location => location.name),
        })
      }
    } else {
      console.log('startLocationNotAll');
      this.setState({
        startLocation,
      });
    }
  }

  handleGameTypeChange(gameType) {
    console.log(`gameType change:`, gameType);
    if (gameType.indexOf('All') > -1) {
      console.log('gameTypeAll');
      if (this.state.gameType.length === 3) {
        this.setState({
          gameType: [],
        });
      } else {
        this.setState({
          gameType: ['solo', 'duo', 'squad'],
        });
      }
    } else {
      this.setState({
        gameType,
      });
    }
  }

  handleDeathLocationChange(minRow, maxRow, minCol, maxCol) {
    console.log (`row range ${minRow} ${maxRow} - col range ${minCol} ${maxCol}`);
    this.setState({
      deathLocation: {
        minRow,
        maxRow,
        minCol,
        maxCol,
      }
    });
  }

  handlePlaceChange(worstPlace, bestPlace) {
    console.log(`Worst place ${worstPlace} and best place ${bestPlace}`);
    this.setState({
      worstPlace,
      bestPlace,
    });
  }

  handleKillsChange(minKills, maxKills) {
    console.log(`minKills ${minKills} and maxKills ${maxKills}`);
    this.setState({
      minKills,
      maxKills,
    });
  }

  handleLootChange(minLoot, maxLoot) {
    console.log(`minLoot ${minLoot} and maxLoot ${maxLoot}`);
    this.setState({
      minLoot,
      maxLoot,
    });
  }

  handleDistanceTraveledChange(minDistanceTraveled, maxDistanceTraveled) {
    console.log(`minDistanceTraveled ${minDistanceTraveled} and maxDistanceTraveled ${maxDistanceTraveled}`);
    this.setState({
      minDistanceTraveled,
      maxDistanceTraveled,
    });
  }

  handleDaysOfTheWeekChange(days) {
    console.log(`days ${days}`);
    this.setState({
      days,
    });
  }

  handleTimeRangeChange(timeStart, timeEnd) {
    console.log(`timeStart ${timeStart} and timeEnd ${timeEnd}`);
    this.setState({
      timeStart,
      timeEnd,
    });
  }

  handleSeasonsChange(seasons) {
    if (seasons.indexOf('All') > -1) {
      console.log('seasonsAll');
      if (this.state.seasons.length === 3) {
        this.setState({
          seasons: [],
        });
      } else {
        this.setState({
          seasons: [3, 4, 5],
        });
      }
    } else {
      this.setState({
        seasons,
      });
    }
  }

  renderSeasons() {
    if (this.state.seasons.length < 3) {
      return this.state.seasons.join(' and ');
    } else {
      return `${this.state.seasons[0]}, ${this.state.seasons[1]}, ...`;
    }
  } 

  renderStartLocation() {
    if (this.state.startLocation.length === 1) {
      return 'One';
    } else if (this.state.startLocation.length === this.props.locations.length) {
      return '...';
    } else {
      return `Many`;
    }
  }

  renderGameType() {
    if (this.state.gameType.length === 3) {
      return 'All';
    } else {
      return this.state.gameType.join(', ');
    }
  }

  stopPropagation(e) {
    e.stopPropagation();
    console.log('stopped Propagation', e);
  }
  
  render() {
    return (
      <div className="filterMyGamesContainer">
        <div className="filterOptionsBar">
          <div className="filterOption">
            <label>Season</label>
            <Select 
              multiple
              value={this.state.seasons}
              onChange={(e) => this.handleSeasonsChange(e.target.value)}
              renderValue={this.renderSeasons}
            >
              <MenuItem key={'All'} value={'All'}>
                <PurpleCheckBox checked={this.state.seasons.length === 3}></PurpleCheckBox>
                <ListItemText primary={'All'} />
              </MenuItem>
              {[3, 4, 5].map(season => 
              <MenuItem key={`s${season}`} value={season}>
                <PurpleCheckBox checked={(this.state.seasons.indexOf('All') > -1 ? true : this.state.seasons.indexOf(season) > -1)} />
                <ListItemText primary={season} />
              </MenuItem>
              )}
            </Select>
          </div>
          <div className="filterOption">
            <label>Start Location</label>
            <Select 
              multiple
              value={this.state.startLocation}
              onChange={(e) => this.handleStartLocationChange(e.target.value)}
              renderValue={this.renderStartLocation}
            >
              <MenuItem key={'All'} value={'All'}>
                <PurpleCheckBox checked={this.state.startLocation.length === this.props.locations.length} />
                <ListItemText primary={'All'} />
              </MenuItem>
              {this.props.locations.map(location => 
              <MenuItem key={location.name} value={location.name}>
                <PurpleCheckBox checked={(this.state.startLocation.indexOf('All') > -1 ? true : this.state.startLocation.indexOf(location.name) > -1)} />
                <ListItemText primary={location.name} />
              </MenuItem>
              )}
            </Select>
          </div>
          <div className="filterOption">
            <label>GameType</label>
            <Select
              multiple
              value={this.state.gameType}
              onChange={(e) => this.handleGameTypeChange(e.target.value)}
              renderValue={this.renderGameType}
            >
              <MenuItem key="All" value="All">
                <PurpleCheckBox checked={this.state.gameType.length === 3} />
                <ListItemText primary="All" />
              </MenuItem>
              <MenuItem key="solo" value="solo">
                <PurpleCheckBox checked={this.state.gameType.indexOf('solo') > -1} />
                <ListItemText primary="Solo" />
              </MenuItem>
              <MenuItem key="duo" value="duo">
                <PurpleCheckBox checked={this.state.gameType.indexOf('duo') > -1} />
                <ListItemText primary="Duo" />
              </MenuItem>
              <MenuItem key="squad" value="squad">
                <PurpleCheckBox checked={this.state.gameType.indexOf('squad') > -1} />
                <ListItemText primary="Squad" />
              </MenuItem>
            </Select>
          </div>
          <div className="filterOption">
            <div className="filterStatsOptionDropdown" onClick={this.toggleShowFilterStatsOptions}>Filter By Stats</div>
            {this.state.showFilterStatsOptions &&
            <div className="filterStatsOptionsDropdownContainerWrapper" onClick={this.toggleShowFilterStatsOptions} >
              <div className="filterStatsOptionsDropdownContainer" onClick={this.stopPropagation}>
                <div className="killsFilterOptions" >
                  <h3>Kills</h3>
                  <div className="minMaxOptions">
                    <label>Min: </label><input type="number" id="minKillsInput" defaultValue={this.state.minKills} onChange={(e) => this.handleKillsChange(e.target.value, this.state.maxKills)} />
                    <label>Max: </label><input type="number" id="maxKillsInput" defaultValue={this.state.maxKills} onChange={(e) => this.handleKillsChange(this.state.minKills, e.target.value)} />
                  </div>
                </div>
                <div className="placeFilterOptions">
                  <h3>Place</h3>
                  <div className="minMaxOptions">
                    <label>Min: </label><input type="number" id="bestPlaceInput" defaultValue={this.state.bestPlace} onChange={(e) => this.handlePlaceChange(this.state.worstPlace, e.target.value)} />
                    <label>Max: </label><input type="number" id="worstPlaceInput" defaultValue={this.state.worstPlace} onChange={(e) => this.handlePlaceChange(e.target.value, this.state.bestPlace)} />
                  </div>
                </div>
                <div className="lootFilterOptions">
                  <h3>Loot</h3>
                  <div className="minMaxOptions">
                    <label>Min: </label><input type="number" id="minLootInput" defaultValue={this.state.minLoot} onChange={(e) => this.handleLootChange(e.target.value, this.state.maxLoot)} />
                    <label>Max: </label><input type="number" id="maxLootInput" defaultValue={this.state.maxLoot} onChange={(e) => this.handleLootChange(this.state.minLoot, e.target.value)} />
                  </div>
                </div>
              </div>
            </div>}
          </div>
        </div>
        <div className="submitGameButtonContainer">
          <button className="submitGameButton" onClick={() => this.props.handleFiltering(false, this.state.gameType, this.state.startLocation, this.state.worstPlace, this.state.bestPlace, this.state.minKills, this.state.maxKills, this.state.minLoot, this.state.maxLoot, undefined, this.state.seasons, 0, 82, 0, 82)}>Filter!</button>
        </div>
      </div>
    );
  }
}

export default FilterMyGames;