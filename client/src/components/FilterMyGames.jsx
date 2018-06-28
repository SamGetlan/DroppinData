import React from 'react';
import Select from '@material-ui/core/Select';
// import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import CheckBox from '@material-ui/core/CheckBox';
import ListItemText from '@material-ui/core/ListItemText';

class FilterMyGames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameType: ['solo', 'duo', 'squad'],
      startLocation: this.props.locations.map(location => location.name),
      deathLocation: 'All',
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

  renderStartLocation() {
    if (this.state.startLocation.length < 3) {
      return this.state.startLocation.join(', ');
    } else if (this.state.startLocation.length === this.props.locations.length) {
      return 'All';
    } else {
      return `${this.state.startLocation[0]}, ${this.state.startLocation[1]}, ...`;
    }
  }

  renderGameType() {
    if (this.state.gameType.length === 3) {
      return 'All';
    } else {
      return this.state.gameType.join(', ');
    }
  }
  render() {
    return (
      <div>
        {/* <select onChange={(e) => this.handleStartLocationChange(e.target.value)}>
          <option value="All" selected={this.props.filterOptions.startLocation === 'All'}>All Locations</option>
          {this.props.locations.map(location => 
          <option value={location.name} selected={location.name === this.props.filterOptions.startLocation} >{location.name}</option>
          )}
        </select> */}
        <InputLabel htmlFor="select-multiple-checkbox">Location</InputLabel>
        <Select 
          multiple
          value={this.state.startLocation}
          onChange={(e) => this.handleStartLocationChange(e.target.value)}
          renderValue={this.renderStartLocation}
        >
          <MenuItem key={'All'} value={'All'}>
            <CheckBox checked={this.state.startLocation.length === this.props.locations.length} />
            <ListItemText primary={'All'} />
          </MenuItem>
          {this.props.locations.map(location => 
          <MenuItem key={location.name} value={location.name}>
            <CheckBox checked={(this.state.startLocation.indexOf('All') > -1 ? true : this.state.startLocation.indexOf(location.name) > -1)} />
            <ListItemText primary={location.name} />
          </MenuItem>
          )}
        </Select>
        <label>GameType</label>
        {/* <select onChange={(e) => this.handleGameTypeChange(e.target.value)}>
          <option value="All" selected={this.state.gameType === 'All'}>All</option>
          <option value="solo" selected={this.state.gameType === 'solo'}>Solo</option>
          <option value="duo" selected={this.state.gameType === 'duo'}>Duo</option>
          <option value="squad" selected={this.state.gameType === 'squad'}>Squad</option>
        </select> */}
        <Select
          multiple
          value={this.state.gameType}
          onChange={(e) => this.handleGameTypeChange(e.target.value)}
          renderValue={this.renderGameType}
        >
          <MenuItem key="All" value="All">
            <CheckBox checked={this.state.gameType.length === 3} />
            <ListItemText primary="All" />
          </MenuItem>
          <MenuItem key="solo" value="solo">
            <CheckBox checked={this.state.gameType.indexOf('solo') > -1} />
            <ListItemText primary="Solo" />
          </MenuItem>
          <MenuItem key="duo" value="duo">
            <CheckBox checked={this.state.gameType.indexOf('duo') > -1} />
            <ListItemText primary="Duo" />
          </MenuItem>
          <MenuItem key="squad" value="squad">
            <CheckBox checked={this.state.gameType.indexOf('squad') > -1} />
            <ListItemText primary="Squad" />
          </MenuItem>
        </Select>
        <label>Worst Place</label>
        <input type="number" id="worstPlaceInput" defaultValue={this.state.worstPlace} onChange={(e) => this.handlePlaceChange(e.target.value, this.state.bestPlace)} />
        <label>Best Place</label>
        <input type="number" id="bestPlaceInput" defaultValue={this.state.bestPlace} onChange={(e) => this.handlePlaceChange(this.state.worstPlace, e.target.value)} />
        <label>Min Kills</label>
        <input type="number" id="minKillsInput" defaultValue={this.state.minKills} onChange={(e) => this.handleKillsChange(e.target.value, this.state.maxKills)} />
        <label>Max Kills</label>
        <input type="number" id="maxKillsInput" defaultValue={this.state.maxKills} onChange={(e) => this.handleKillsChange(this.state.minKills, e.target.value)} />
        <label>Min Loot</label>
        <input type="number" id="minLootInput" defaultValue={this.state.minLoot} onChange={(e) => this.handleLootChange(e.target.value, this.state.maxLoot)} />
        <label>Max Loot</label>
        <input type="number" id="maxLootInput" defaultValue={this.state.maxLoot} onChange={(e) => this.handleLootChange(this.state.minLoot, e.target.value)} />
        <label>Min Distance</label>
        <input type="number" id="minDistanceInput" defaultValue={this.state.minDistanceTraveled} onChange={(e) => this.handleDistanceTraveledChange(e.target.value, this.state.maxDistanceTraveled)} />
        <label>Max Distance</label>
        <input type="number" id="maxDistanceInput" defaultValue={this.state.maxDistanceTraveled} onChange={(e) => this.handleDistanceTraveledChange(this.state.minDistanceTraveled, e.target.value)} />
        <button onClick={() => this.props.handleFiltering(false, this.state.gameType, this.state.startLocation, this.state.worstPlace, this.state.bestPlace, this.state.minKills, this.state.maxKills, this.state.minLoot, this.state.maxLoot, undefined, 0, 84, 0, 84)}>Filter!</button>
      </div>
    );
  }
}

export default FilterMyGames;