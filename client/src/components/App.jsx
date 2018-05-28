import React from 'react';
import axios from 'axios';
import Navbar from './Navbar.jsx';
import Body from './Body.jsx';
import UserForm from './UserForm.jsx';
import FilterLocations from './FilterLocations.jsx';
import AccountOptionsForm from './AccountOptionsForm.jsx';
import FullMap from './FullMap.jsx';
import locations from '../data.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: '',
      locations,
      filteredLocations: locations.slice(),
      userFormActive: true,
      filterLocationsActive: false,
      signUpForm: false,
      loggedIn: false,
      active: false,
      activeIndex: false,
      userGames: null,
      submitButtonState: true,
      accountOptionsForm: false,
      logInFailed: null,
      userGameData: null,
      showFullMap: false,
    };
    this.handleUserFormClick = this.handleUserFormClick.bind(this);
    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.loginUserFormOption = this.loginUserFormOption.bind(this);
    this.signUpUserFormOption = this.signUpUserFormOption.bind(this);
    this.handleAccountSignUp = this.handleAccountSignUp.bind(this);
    this.handleAccountSignIn = this.handleAccountSignIn.bind(this);
    this.filterOut = this.filterOut.bind(this);
    this.filterIn = this.filterIn.bind(this);
    this.handleGameSubmit = this.handleGameSubmit.bind(this);
    this.handleActionClick = this.handleActionClick.bind(this);
    this.handleTileClick = this.handleTileClick.bind(this);
    this.handleAccountOptionsClick = this.handleAccountOptionsClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.getUserGameData = this.getUserGameData.bind(this);
    this.hardGroupClick = this.hardGroupClick.bind(this);
    this.notRecentGroupClick = this.notRecentGroupClick.bind(this);
    this.killsGroupClick = this.killsGroupClick.bind(this);
    this.placeGroupClick = this.placeGroupClick.bind(this);
    this.popularGroupClick = this.popularGroupClick.bind(this);
    this.filterAllIn = this.filterAllIn.bind(this);
    this.filterAllOut = this.filterAllOut.bind(this);
    this.handleShowMapClick = this.handleShowMapClick.bind(this);
    this.handleMapChoiceClick = this.handleMapChoiceClick.bind(this);
  }

  handleUserFormClick() {
    this.setState({
      userFormActive: !this.state.userFormActive,
    });
  }

  handleFilterClick() {
    this.setState({
      filterLocationsActive: !this.state.filterLocationsActive,
    });
  }

  handleActionClick() {
    const { filteredLocations } = this.state;
    const index = Math.floor(Math.random() * filteredLocations.length);
    console.log(filteredLocations[index].camelCase);
    this.setState({
      active: filteredLocations[index].camelCase,
      activeIndex: index,
    });
  }

  loginUserFormOption() {
    this.setState({
      signUpForm: false,
    });
  }

  signUpUserFormOption() {
    this.setState({
      signUpForm: true,
    });
  }

  handleAccountSignUp(username, password) {
    const context = this;
    axios.post('/api/signup', {
      username,
      password,
      createdAt: new Date(),
    })
      .then((data) => {
        console.log('signUp successful:', data.config.data);
        const user = JSON.parse(data.config.data).username;
        context.setState({
          loggedIn: user,
          userFormActive: false,
        });
      })
      .catch((err) => {
        console.log('There was an error:', err);
      });
  }

  handleAccountSignIn(username, password) {
    const context = this;
    axios.post('/api/login', {
      username,
      password,
    })
      .then((data) => {
        if (data.data.username) {
          console.log('Login successful:', data);
          const user = (data.data.username);
          context.setState({
            loggedIn: user,
            userFormActive: false,
            logInFailed: false,
          });
          axios.get('/api/games')
            .then((data) => {
              console.log('data received -->', data);
              const userGameData = context.getUserGameData(data.data);
              context.setState({
                userGames: data.data,
                userGameData,
              });
            });
        } else {
          console.log('Login failed:', data.data);
          context.setState({
            logInFailed: true,
          });
        }
      })
      .catch((err) => {
        console.log('There was an error:', err);
      });
  }

  filterIn(location) {
    console.log(this.state.filteredLocations);
    if (this.state.filteredLocations.indexOf(location) === -1) {
      this.state.filteredLocations.push(location);
      const filteredLocations = this.state.filteredLocations;
      this.setState({ filteredLocations });
    }
  }

  filterOut(location) {
    console.log(this.state.filteredLocations);
    const index = this.state.filteredLocations.indexOf(location);
    if (index !== -1) {
      this.state.filteredLocations.splice(index, 1);
      const filteredLocations = this.state.filteredLocations;
      this.setState({ filteredLocations });
    }
  }

  handleGameSubmit(place, kills, loot, gameType, death) {
    const context = this;
    this.setState({
      submitButtonState: false,
    })
    // console.log('Inside the handleSubmit function');
    // console.log(`place --> ${place}`);
    // console.log(`kills --> ${kills}`);
    // console.log('loot -->', loot);
    // console.log('death -->', death);
    // console.log(`Game Type --> ${gameType}`);
    if (place >= 1 && place <= 100 && kills <= 100 && kills >= 0 && gameType && this.state.loggedIn && death !== 'null') {
      axios.post('/api/games', {
        user: this.state.loggedIn,
        date: new Date(),
        location: this.state.filteredLocations[this.state.activeIndex].name,
        place,
        kills,
        loot,
        gameType,
        death,
      })
        .then((data) => {
          console.log('We have received Data -->', data);
          context.setState({
            userGames: data.data,
          });
          const $confirm = document.createElement('p');
          $confirm.innerHTML = 'Game was successfully submitted';
          document.getElementsByClassName('statBox')[0].appendChild($confirm);
          setTimeout(() => {
            context.setState({
              submitButtonState: true,
            })
          }, 1000);
          setTimeout(() => {
            $confirm.remove();
          }, 4000);
        })
        .catch((err) => {
          console.log('There was an Error -->', err);
        });
    } else {
      let suggestion;
      if (place < 1 || place > 100 || place === undefined) {
        suggestion = 'Your place needs to be between 1 and 100.';
      } else if (kills < 0 || kills > 100 || kills === undefined) {
        suggestion = 'Your kills need to be between 0 and 100.';
      } else if (loot < 1 || loot > 10) {
        suggestion = 'Loot rating must be between 1 and 10.';
      } else if (!gameType) {
        suggestion = 'A game type must be selected.';
      } else if (death === 'null') {
        suggestion = 'A death location must be selected.';
      } else if (!this.state.loggedIn) {
        suggestion = 'You must log in to submit a game.';
      }
      const $denied = document.createElement('p');
      $denied.innerHTML = `There was an error submitting your game. ${suggestion}`;
      document.getElementsByClassName('statBox')[0].appendChild($denied);
      setTimeout(() => {
        context.setState({
          submitButtonState: true,
        })
      }, 1000);
      setTimeout(() => {
        $denied.remove();
      }, 4000);
    }
  }

  handleTileClick(location) {
    console.log('inside handleTileClick:', location);
    const index = this.state.filteredLocations.findIndex(element => (element.camelCase === location.camelCase));
    console.log('active Location -->', location);
    console.log('active index -->', index);
    this.setState({
      active: location.camelCase,
      activeIndex: index,
    });
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For everything else
  }

  handleAccountOptionsClick() {
    console.log('inside handleAccountOptionsClick');
    this.setState({
      accountOptionsForm: !this.state.accountOptionsForm,
    });
  }

  handleLogout() {
    const context = this;
    axios.get('/api/logout')
      .then((data) => {
        context.setState({
          loggedIn: false,
          accountOptionsForm: false,
          userGames: null,
        })
      })
      .catch((err) => {
        console.log('err:', err);
      })
  }

  getUserGameData(games) {
    const results = {};
    const getPlace = (game) => {
      if (game.gameType === 'solo') {
        return game.place;
      } else if (game.gameType === 'duo') {
        return game.place * 2;
      } else if (game.gameType === 'squad') {
        return game.place * 4;
      }
    }
    const updateStats = (results, game, gameType) => {
      results[game.location][gameType].totalKills += game.kills;
      results[game.location][gameType].totalPlace += (gameType === 'all' ? getPlace(game) : game.place);
      results[game.location][gameType].totalLoot += game.loot;
      results[game.location][gameType].bestKills = Math.max(results[game.location][gameType].bestKills, game.kills);
      results[game.location][gameType].bestPlace = Math.min(results[game.location][gameType].bestPlace, (gameType === 'all' ? getPlace(game) : game.place));
      results[game.location][gameType].bestLoot = Math.max(results[game.location][gameType].bestLoot, game.loot);
      results[game.location][gameType].recentKills = game.kills;
      results[game.location][gameType].recentPlace = (gameType === 'all' ? getPlace(game) : game.place);
      results[game.location][gameType].recentLoot = game.loot;
      results[game.location][gameType].totalGames++;
      if (game.date > results[game.location][gameType].mostRecent) {
        results[game.location][gameType].mostRecent = game.date;
      }
    }
    games.forEach((game, index, games) => {
      if (!results[game.location]) {
        results[game.location] = {
          solo: {
            averageKills: 0,
            averagePlace: 0,
            averageLoot: 0,
            bestKills: 0,
            bestPlace: 101,
            bestLoot: 0,
            totalKills: 0,
            totalPlace: 0,
            totalLoot: 0,
            totalGames: 0,
            recentKills: 0,
            recentPlace: 0,
            recentLoot: 0,
            mostRecent: game.date,
          },
          duo: {
            averageKills: 0,
            averagePlace: 0,
            averageLoot: 0,
            bestKills: 0,
            bestPlace: 101,
            bestLoot: 0,
            totalKills: 0,
            totalPlace: 0,
            totalLoot: 0,
            totalGames: 0,
            recentKills: 0,
            recentPlace: 0,
            recentLoot: 0,
            mostRecent: game.date,
          },
          squad: {
            averageKills: 0,
            averagePlace: 0,
            averageLoot: 0,
            bestKills: 0,
            bestPlace: 101,
            bestLoot: 0,
            totalKills: 0,
            totalPlace: 0,
            totalLoot: 0,
            totalGames: 0,
            recentKills: 0,
            recentPlace: 0,
            recentLoot: 0,
            mostRecent: game.date,
          },
          all: {
            averageKills: 0,
            averagePlace: 0,
            averageLoot: 0,
            bestKills: 0,
            bestPlace: 101,
            bestLoot: 0,
            totalKills: 0,
            totalPlace: 0,
            totalLoot: 0,
            totalGames: 0,
            recentKills: 0,
            recentPlace: 0,
            recentLoot: 0,
            mostRecent: game.date,
          },
        }
      }
      updateStats(results, game, 'all');
      updateStats(results, game, game.gameType);
    });
    for (var location in results) {
      results[location].solo.averageKills = results[location].solo.totalKills / results[location].solo.totalGames;
      results[location].duo.averageKills = results[location].duo.totalKills / results[location].duo.totalGames;
      results[location].squad.averageKills = results[location].squad.totalKills / results[location].squad.totalGames;
      results[location].all.averageKills = results[location].all.totalKills / results[location].all.totalGames;
      results[location].solo.averagePlace = results[location].solo.totalPlace / results[location].solo.totalGames;
      results[location].duo.averagePlace = results[location].duo.totalPlace / results[location].duo.totalGames;
      results[location].squad.averagePlace = results[location].squad.totalPlace / results[location].squad.totalGames;
      results[location].all.averagePlace = results[location].all.totalPlace / results[location].all.totalGames;
    }
    return results;
  }

  hardGroupClick() {
    const type = 'all';
    if (this.state.userGames.length > 9) {
      const results = [];
      const userGameData = this.state.userGameData;
      const hardGroup = Object.keys(this.state.userGameData);
      hardGroup.sort((a, b) => {
        return userGameData[b][type].averagePlace - userGameData[a][type].averagePlace;
      });
      for (var i = 0; i < Math.min(hardGroup.length, 8); i++) {
        for (var ii = 0; ii < locations.length; ii++) {
          if (locations[ii].name === hardGroup[i]) {
            results.push(locations[ii]);
          }
        }
      }
      this.setState({
        filteredLocations: results,
      });

    } else {
      console.log('Need to save at least 10 games in order for customSorting to work');
    }
  }

  notRecentGroupClick(gameType = 'all') {
    console.log('inside notRecentGroupClick');
    const type = 'all';
    if (this.state.userGames.length > 9) {
      const results = [];
      const userGameData = this.state.userGameData;
      const notRecentGroup = Object.keys(this.state.userGameData);
      notRecentGroup.sort((a, b) => {
        return userGameData[a][type].mostRecent - userGameData[b][type].mostRecent;
      });
      for (var i = 0; i < Math.min(notRecentGroup.length, 8); i++) {
        for (var ii = 0; ii < locations.length; ii++) {
          if (locations[ii].name === notRecentGroup[i]) {
            results.push(locations[ii]);
          }
        }
      }
      this.setState({
        filteredLocations: results,
      });
    }
  }

  killsGroupClick() {
    console.log('inside killsGroupClick');
    const type = 'all';
    if (this.state.userGames.length > 9) {
      const results = [];
      const userGameData = this.state.userGameData;
      const killsGroup = Object.keys(this.state.userGameData);
      killsGroup.sort((a, b) => {
        return userGameData[b][type].averageKills - userGameData[a][type].averageKills;
      });
      for (var i = 0; i < Math.min(killsGroup.length, 8); i++) {
        for (var ii = 0; ii < locations.length; ii++) {
          if (locations[ii].name === killsGroup[i]) {
            results.push(locations[ii]);
          }
        }
      }
      this.setState({
        filteredLocations: results,
      });
    } else {
      console.log('Need to save at least 10 games in order for customSorting to work');
    }
  }

  placeGroupClick() {
    console.log('inside placeGroupClick');
    const type = 'all';
    if (this.state.userGames.length > 9) {
      const results = [];
      const userGameData = this.state.userGameData;
      const easyGroup = Object.keys(this.state.userGameData);
      easyGroup.sort((a, b) => {
        return userGameData[a][type].averagePlace - userGameData[b][type].averagePlace;
      });
      for (var i = 0; i < Math.min(easyGroup.length, 8); i++) {
        for (var ii = 0; ii < locations.length; ii++) {
          if (locations[ii].name === easyGroup[i]) {
            results.push(locations[ii]);
          }
        }
      }
      this.setState({
        filteredLocations: results,
      });

    } else {
      console.log('Need to save at least 10 games in order for customSorting to work');
    }
  }

  popularGroupClick() {
    console.log('inside popularGroupClick');
    const type = 'all';
    if (this.state.userGames.length > 9) {
      const results = [];
      const userGameData = this.state.userGameData;
      const popularGroup = Object.keys(this.state.userGameData);
      popularGroup.sort((a, b) => {
        return userGameData[b][type].totalGames - userGameData[a][type].totalGames;
      });
      for (var i = 0; i < Math.min(popularGroup.length, 8); i++) {
        for (var ii = 0; ii < locations.length; ii++) {
          if (locations[ii].name === popularGroup[i]) {
            results.push(locations[ii]);
          }
        }
      }
      this.setState({
        filteredLocations: results,
      });

    } else {
      console.log('Need to save at least 10 games in order for customSorting to work');
    }
  }

  filterAllIn() {
    this.setState({
      filteredLocations: locations.slice(),
    });
  }

  filterAllOut() {
    console.log('inside filterAllOut');
    this.setState({
      filteredLocations: [],
    });
  }

  handleShowMapClick() {
    this.setState({
      showFullMap: !this.state.showFullMap,
    });
  }

  handleMapChoiceClick(e) {
    console.log('inside handleMapChoiceClick from div -->', e.target.id);
    for (var i = 0; i < locations.length; i++) {
      if (locations[i].camelCase === e.target.id) {
        this.filterIn(locations[i]);
      }
    }
    for (var k = 0; k < this.state.filteredLocations.length; k++) {
      if (this.state.filteredLocations[k].camelCase === e.target.id) {
        this.setState({
          active: e.target.id,
          activeIndex: k,
          showFullMap: false,
        });
      }
    }
  }

  render() {
    return (
      <div id="app">
        <Navbar
          navButtons={['Home', 'Map', 'Filter Locations', 'Sign Up or Login']}
          classes={['home', 'map', 'filter', 'login']}
          handleUserFormClick={this.handleUserFormClick}
          handleFilterClick={this.handleFilterClick}
          loggedIn={this.state.loggedIn}
          handleAccountOptionsClick={this.handleAccountOptionsClick}
          handleShowMapClick={this.handleShowMapClick}
        />
        <Body
          filteredLocations={this.state.filteredLocations}
          activeIndex={this.state.activeIndex}
          handleSubmit={this.handleGameSubmit}
          active={this.state.active}
          handleActionClick={this.handleActionClick}
          userGames={this.state.userGames}
          handleTileClick={this.handleTileClick}
          submitButtonState={this.state.submitButtonState}
          locations={this.state.locations}
        />
        {this.state.userFormActive &&
        <UserForm
          handleUserFormClick={this.handleUserFormClick}
          signUpForm={this.state.signUpForm}
          loginUserFormOption={this.loginUserFormOption}
          signUpUserFormOption={this.signUpUserFormOption}
          handleAccountSignIn={this.handleAccountSignIn}
          handleAccountSignUp={this.handleAccountSignUp}
          logInFailed={this.state.logInFailed}
        />}
        {this.state.filterLocationsActive &&
        <FilterLocations
          locations={this.state.locations}
          filteredLocations={this.state.filteredLocations}
          filterOut={this.filterOut}
          filterIn={this.filterIn}
          handleFilterClick={this.handleFilterClick}
          hardGroupClick={this.hardGroupClick}
          notRecentGroupClick={this.notRecentGroupClick}
          killsGroupClick={this.killsGroupClick}
          placeGroupClick={this.placeGroupClick}
          popularGroupClick={this.popularGroupClick}
          filterAllIn={this.filterAllIn}
          filterAllOut={this.filterAllOut}
        />}
        {this.state.accountOptionsForm &&
        <AccountOptionsForm
          handleAccountOptionsClick={this.handleAccountOptionsClick}
          loggedIn={this.state.loggedIn}
          handleLogout={this.handleLogout}
        />}
        {this.state.showFullMap &&
        <FullMap
          handleShowMapClick={this.handleShowMapClick}
          locations={this.state.locations}
          handleMapChoiceClick={this.handleMapChoiceClick}
        />}
      </div>
    );
  }
}

export default App;
