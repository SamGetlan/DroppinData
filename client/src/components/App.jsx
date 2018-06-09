import React from 'react';
import axios from 'axios';
import { Redirect, Link, Route, withRouter } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Body from './Body.jsx';
import UserForm from './UserForm.jsx';
import FilterLocations from './FilterLocations.jsx';
import AccountOptionsForm from './AccountOptionsForm.jsx';
import FullMap from './FullMap.jsx';
import AccountRecovery from './AccountRecovery.jsx';
import ResetPassword from './ResetPassword.jsx';
import AccountSettings from './AccountSettings.jsx';
import MyGames from './MyGames.jsx';
import StatDashboard from './StatDashboard.jsx';
import Stats from './Stats.jsx';
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
      userGameData: {},
      showFullMap: false,
      userSettings: {},
      rows: null,
      cols: null,
      statBoxFlashText: null,
      mapMarker: null,
      deathMapMarker: [41, 42],
      loading: false,
      mapMarkerStyle: {
        top: 0,
        left: 0,
      },
      deathMapMarkerStyle: {
        top: '50%',
        left: '50%',
      },
      deadCenterFlashText: null,
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
    this.handleRecoveryAttempt = this.handleRecoveryAttempt.bind(this);
    this.handlePasswordReset = this.handlePasswordReset.bind(this);
    this.applySettings = this.applySettings.bind(this);
    this.resetMarker = this.resetMarker.bind(this);
    this.handleCoordinateChoiceClick = this.handleCoordinateChoiceClick.bind(this);
    this.handleDeathCoordinateChoiceClick = this.handleDeathCoordinateChoiceClick.bind(this);
    this.checkDeathMarkerLocation = this.checkDeathMarkerLocation.bind(this);
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

  handleAccountSignUp(username, password, emailAddress) {
    const context = this;
    axios.post('/api/signup', {
      username,
      password,
      createdAt: new Date(),
      emailAddress,
    })
      .then((data) => {
        console.log('signUp successful:', data.config.data);
        const user = JSON.parse(data.config.data).username;
        context.setState({
          loggedIn: user,
          userFormActive: false,
        });
        this.props.history.push('/home')
      })
      .catch((err) => {
        context.setState({
          deadCenterFlashText: `There was an error: ${err}`,
        });
        setTimeout(() => {
          context.setState({
            deadCenterFlashText: null,
          });
        }, 3000)
        console.log('There was an error:', err);
      });
  }

  handleAccountSignIn(username, password) {
    const context = this;
    this.setState({
      loading: true,
    })
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
            userSettings: data.data.settings,
          });
          axios.get('/api/games')
            .then((data) => {
              console.log('data received -->', data);
              const userGameData = context.getUserGameData(data.data);
              context.props.history.push('/home');
              context.setState({
                userGames: data.data,
                userGameData,
                loading: false,
              });
            });
        } else {
          console.log('Login failed:', data.data);
          context.setState({
            logInFailed: true,
            loading: false,
          });
          setTimeout(() => {
            context.setState({
              logInFailed: false,
            });
          }, 2500);
        }
      })
      .catch((err) => {
        context.setState({
          deadCenterFlashText: `There was an error: ${err}`,
          loading: false,
        });
        setTimeout(() => {
          context.setState({
            deadCenterFlashText: null,
          });
        }, 3000)
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

  handleGameSubmit(place, kills, loot, gameType, stormDeath) {
    console.log('stormDeath:', typeof stormDeath);
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
    if (place >= 1 && place <= 100 && kills <= 100 && kills >= 0 && gameType && (stormDeath === false || stormDeath === true) && this.state.loggedIn && this.state.userSettings.locationTracking === ('name' || 'grid' || 'nameCoordinates' || 'gridCoordinates')) {
      const deathCoordinates = (place !== 1 ? this.state.deathMapMarker : undefined);
      axios.post('/api/games', {
        user: this.state.loggedIn,
        locationTracking: this.state.userSettings.locationTracking,
        date: new Date(),
        location: this.state.filteredLocations[this.state.activeIndex].name,
        startCoordinates: this.state.mapMarker,
        place,
        kills,
        loot,
        gameType,
        stormDeath,
        deathCoordinates,
      })
        .then((data) => {
          console.log('We have received Data -->', data);
          const userGameData = context.getUserGameData(data.data);
          context.setState({
            userGames: data.data,
            userGameData,
            deathMapMarkerStyle: {
              top: '50%',
              left: '50%',
            },
            statBoxFlashText: 'Game was successfully submitted',
          });
          setTimeout(() => {
            context.setState({
              submitButtonState: true,
            })
          }, 1000);
          setTimeout(() => {
            context.setState({
              statBoxFlashText: null,
            })
          }, 3000);
        })
        .catch((err) => {
          context.setState({
            statBoxFlashText: `There was an Error: ${err}`,
          });
          setTimeout(() => {
            context.setState({
              statBoxFlashText: null,
            });
          });
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
      } else if (!this.state.loggedIn) {
        suggestion = 'You must log in to submit a game.';
      } else {
        suggestion = 'There seems to be an error with your settings, please logout and log back in,';
      };
      context.setState({
        statBoxFlashText: suggesstion,
      });
      setTimeout(() => {
        context.setState({
          submitButtonState: true,
        });
      }, 1000);
      setTimeout(() => {
        context.setState({
          statBoxFlashText: null,
        });
      }, 3000);
    }
  }

  handleTileClick(location) {
    const index = this.state.filteredLocations.findIndex(element => (element.camelCase === location.camelCase));
    this.setState({
      active: location.camelCase,
      activeIndex: index,
    });
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For everything else
  }

  handleAccountOptionsClick() {
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
          userGameData: {},
        })
      })
      .catch((err) => {
        context.setState({
          deadCenterFlashText: `There was an error: ${err}`,
        });
        setTimeout(() => {
          context.setState({
            deadCenterFlashText: null,
          });
        }, 3000)
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
      results[location].solo.averageKills = Math.round(results[location].solo.totalKills / results[location].solo.totalGames * 10) / 10;
      results[location].duo.averageKills = Math.round(results[location].duo.totalKills / results[location].duo.totalGames * 10) / 10;
      results[location].squad.averageKills = Math.round(results[location].squad.totalKills / results[location].squad.totalGames * 10) / 10;
      results[location].all.averageKills = Math.round(results[location].all.totalKills / results[location].all.totalGames * 10) / 10;
      results[location].solo.averagePlace = Math.round(results[location].solo.totalPlace / results[location].solo.totalGames * 10) / 10;
      results[location].duo.averagePlace = Math.round(results[location].duo.totalPlace / results[location].duo.totalGames * 10) / 10;
      results[location].squad.averagePlace = Math.round(results[location].squad.totalPlace / results[location].squad.totalGames * 10) / 10;
      results[location].all.averagePlace = Math.round(results[location].all.totalPlace / results[location].all.totalGames * 10) / 10;
      results[location].solo.averageLoot = Math.round(results[location].solo.totalLoot / results[location].solo.totalGames * 10) / 10;
      results[location].duo.averageLoot = Math.round(results[location].duo.totalLoot / results[location].duo.totalGames * 10) / 10;
      results[location].squad.averageLoot = Math.round(results[location].squad.totalLoot / results[location].squad.totalGames * 10) / 10;
      results[location].all.averageLoot = Math.round(results[location].all.totalLoot / results[location].all.totalGames * 10) / 10;
    }
    return results;
  }

  hardGroupClick() {
    const context = this;
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
        activeIndex: false,
        active: false,
      });

    } else {
      this.setState({
        deadCenterFlashText: `Need to save at least 10 games in order for pre-set filters to work`,
      });
      setTimeout(() => {
        context.setState({
          deadCenterFlashText: null,
        });
      }, 3000)
      console.log('Need to save at least 10 games in order for pre-set filters to work');
    }
  }

  notRecentGroupClick(gameType = 'all') {
    const context = this;
    console.log('inside notRecentGroupClick');
    const type = 'all';
    if (this.state.userGames.length > 9) {
      const results = [];
      const userGameData = this.state.userGameData;
      const notRecentGroup = Object.keys(this.state.userGameData);
      notRecentGroup.sort((a, b) => {
        return userGameData[b][type].mostRecent - userGameData[a][type].mostRecent;
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
        activeIndex: false,
        active: false,
      });
    } else {
      this.setState({
        deadCenterFlashText: `Need to save at least 10 games in order for pre-set filters to work`,
      });
      setTimeout(() => {
        context.setState({
          deadCenterFlashText: null,
        });
      }, 3000)
    }
  }

  killsGroupClick() {
    console.log('inside killsGroupClick');
    const context = this;
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
        activeIndex: false,
        active: false,
      });
    } else {
      this.setState({
        deadCenterFlashText: `Need to save at least 10 games in order for pre-set filters to work`,
      });
      setTimeout(() => {
        context.setState({
          deadCenterFlashText: null,
        });
      }, 3000)
      console.log('Need to save at least 10 games in order for customSorting to work');
    }
  }

  placeGroupClick() {
    console.log('inside placeGroupClick');
    const context = this;
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
        activeIndex: false,
        active: false,
      });

    } else {
      this.setState({
        deadCenterFlashText: `Need to save at least 10 games in order for pre-set filters to work`,
      });
      setTimeout(() => {
        context.setState({
          deadCenterFlashText: null,
        });
      }, 3000)
      console.log('Need to save at least 10 games in order for customSorting to work');
    }
  }

  popularGroupClick() {
    console.log('inside popularGroupClick');
    const type = 'all';
    const context = this;
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
        activeIndex: false,
        active: false,
      });

    } else {
      this.setState({
        deadCenterFlashText: `Need to save at least 10 games in order for pre-set filters to work`,
      });
      setTimeout(() => {
        context.setState({
          deadCenterFlashText: null,
        });
      }, 3000);
      console.log('Need to save at least 10 games in order for customSorting to work');
    }
  }

  filterAllIn() {
    this.setState({
      filteredLocations: locations.slice(),
      activeIndex: false,
      active: false,
    });
  }

  filterAllOut() {
    console.log('inside filterAllOut');
    this.setState({
      filteredLocations: [],
      activeIndex: false,
      active: false,
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
    this.props.history.push('/home');
  }

  handleRecoveryAttempt(email) {
    const context = this;
    axios.post('/api/forgot', { email })
      .then((data) => {
        console.log(data.data);
        context.props.history.push('/home');
      })
      .catch(err => {
        this.setState({
          deadCenterFlashText: `There was an error: ${err}`,
        });
        setTimeout(() => {
          context.setState({
            deadCenterFlashText: null,
          });
        }, 3000)
        console.log('error:', err);
      })
  }

  handlePasswordReset(password) {
    const context = this;
    axios.post('/api/resetPassword', {
      token: window.location.pathname.split('/')[2],
      password: password,
    })
      .then((data) => {
        console.log(data.data);
        context.props.history.push('/login');
      })
      .catch((err) => {
        this.setState({
          deadCenterFlashText: `Error resetting password: ${err}`,
        });
        setTimeout(() => {
          context.setState({
            deadCenterFlashText: null,
          });
        }, 3000)
        console.log('error resetting password:', err);
      })
  }

  applySettings(settings) {
    const context = this;
    axios.post('/api/applySettings', settings)
      .then((data) => {
        console.log(data);
        context.setState({
          userSettings: data.data.settings,
        })
      })
      .catch((err) => {
        this.setState({
          deadCenterFlashText: `Error submitting settings: ${err}`,
        });
        setTimeout(() => {
          context.setState({
            deadCenterFlashText: null,
          });
        }, 3000)
        console.log('Error submitting settings', err);
      });
  }

  resetMarker() {
    console.log('inside resetMarker');
    this.setState({
      mapMarkerStyle: {
        top: 0,
        left: 0,
      },
    });
  }

  handleCoordinateChoiceClick(e) {
    const location = this.state.filteredLocations[this.state.activeIndex];
    const gridSpot = Number(e.target.id.split('Spot')[1])
    const rows = Math.floor(gridSpot / 72);
    const cols = (gridSpot % 72);
    const getCoordinate = (location, rows, cols) => {
      const { topLeft } = location;
      return [(topLeft[0] + rows), (topLeft[1] + cols)];
    }
    console.log('clickLocation:', getCoordinate(location, rows, cols));
    const top = (`${(rows + 0.5) * (100 / 72)}%`);
    const left = (`${(cols + 0.5) * (100 / 72)}%`);
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

  handleDeathCoordinateChoiceClick(e) {
    const gridSpot = Number(e.target.id.split('Spot')[1]);
    console.log('deathGridSpot:', gridSpot);
    const rows = Math.floor(gridSpot / 84);
    const cols = (gridSpot % 84);
    console.log('deathClickLocation:', [rows, cols]);
    const top = (`${(rows + 0.5) * (100 / 84)}%`);
    const left = (`${(cols + 0.5) * (100 / 84)}%`);
    this.setState({
      deathMapMarker: [rows, cols],
      deathMapMarkerStyle: {
        top,
        left,
      }
    });

  }

  checkDeathMarkerLocation() {
    console.log('inside checkDeathMarkerLocation');
    if (window.location.pathname !== '/filterLocations') {
      if (this.state.activeIndex !== false && (this.state.deathMapMarkerStyle.top !== `${(this.state.filteredLocations[this.state.activeIndex].start[0] + 0.5) * (100 / 72)}%` && this.state.deathMapMarkerStyle.top !== `${(this.state.rows + 0.5) * (100 / 72)}%`) && (this.state.deathMapMarkerStyle.left !== `${(this.state.filteredLocations[this.state.activeIndex].start[1] + 0.5) * (100 / 72)}%`) && this.state.deathMapMarkerStyle.left !== `${(this.state.cols + 0.5) * (100 / 72)}%`) {
        const location = this.state.filteredLocations[this.state.activeIndex];
        const rows = (this.state.filteredLocations[this.state.activeIndex].start[0] / 3);
        const cols = (this.state.filteredLocations[this.state.activeIndex].start[1] / 3);
        const getCoordinate = (location, rows, cols) => {
          const { topLeft } = location;
          return [Math.floor((topLeft[0] / 3) + rows), Math.floor((topLeft[1] / 3) + cols)];
        }
        const deathMapMarker = getCoordinate(location, rows, cols);
        console.log('deathMapMarker:', deathMapMarker);
        this.setState({
          deathMapMarker,
          deathMapMarkerStyle: {
            top: `${(deathMapMarker[0] + 0.5) * (100 / 84)}%`,
            left: `${(deathMapMarker[1] + 0.5) * (100 / 84)}%`,
          },
        });
      }
    }
  }

  componentDidUpdate() {   
    if (window.location.pathname !== '/filterLocations')
    if (this.state.activeIndex !== false && (this.state.mapMarkerStyle.top !== `${(this.state.filteredLocations[this.state.activeIndex].start[0] + 0.5) * (100 / 72)}%` && this.state.mapMarkerStyle.top !== `${(this.state.rows + 0.5) * (100 / 72)}%`) && (this.state.mapMarkerStyle.left !== `${(this.state.filteredLocations[this.state.activeIndex].start[1] + 0.5) * (100 / 72)}%`) && this.state.mapMarkerStyle.left !== `${(this.state.cols + 0.5) * (100 / 72)}%`) {
      const location = this.state.filteredLocations[this.state.activeIndex];
      const rows = this.state.filteredLocations[this.state.activeIndex].start[0];
      const cols = this.state.filteredLocations[this.state.activeIndex].start[1];
      const getCoordinate = (location, rows, cols) => {
        const { topLeft } = location;
        return [(topLeft[0] + rows), (topLeft[1] + cols)];
      }
      this.setState({
        mapMarker: getCoordinate(location, rows, cols),
        mapMarkerStyle: {
          top: `${(this.state.filteredLocations[this.state.activeIndex].start[0] + 0.5) * (100 / 72)}%`,
          left: `${(this.state.filteredLocations[this.state.activeIndex].start[1] + 0.5) * (100 / 72)}%`,
        },
      });
    }
  }

  render() {
    return (
      <div id="app">
        <Route exact path="/" render={() => <Redirect to="/home/login" />} />
        <Route path="/home" render={props => <Navbar {...props}
          navButtons={['Stats', 'Full Map', 'Filter Locations', 'Sign Up or Login']}
          classes={['stats', 'map', 'filter', 'login']}
          handleUserFormClick={this.handleUserFormClick}
          handleFilterClick={this.handleFilterClick}
          loggedIn={this.state.loggedIn}
          handleAccountOptionsClick={this.handleAccountOptionsClick}
          handleShowMapClick={this.handleShowMapClick}
        />} />
        <Route path="/home" render={props => <Body {...props}
          filteredLocations={this.state.filteredLocations}
          activeIndex={this.state.activeIndex}
          handleSubmit={this.handleGameSubmit}
          active={this.state.active}
          handleActionClick={this.handleActionClick}
          userGames={this.state.userGames}
          handleTileClick={this.handleTileClick}
          submitButtonState={this.state.submitButtonState}
          locations={this.state.locations}
          userGameData={this.state.userGameData}
          resetMarker={this.resetMarker}
          mapMarkerStyle={this.state.mapMarkerStyle}
          mapMarker={this.state.mapMarker}
          handleCoordinateChoiceClick={this.handleCoordinateChoiceClick}
          deathMapMarker={this.state.deathMapMarker}
          deathMapMarkerStyle={this.state.deathMapMarkerStyle}
          userSettings={this.state.userSettings}
          handleDeathCoordinateChoiceClick={this.handleDeathCoordinateChoiceClick}
          checkDeathMarkerLocation={this.checkDeathMarkerLocation}
          loggedIn={this.state.loggedIn}
          statBoxFlashText={this.state.statBoxFlashText}
        />} />
        <Route path="/home/login" render={props => <UserForm {...props}
          handleUserFormClick={this.handleUserFormClick}
          signUpForm={this.state.signUpForm}
          loginUserFormOption={this.loginUserFormOption}
          signUpUserFormOption={this.signUpUserFormOption}
          handleAccountSignIn={this.handleAccountSignIn}
          handleAccountSignUp={this.handleAccountSignUp}
          logInFailed={this.state.logInFailed}
        />} />
        <Route path="/home/filterLocations" render={props => <FilterLocations {...props}
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
          userSettings={this.state.userSettings}
        />} />
        <Route path="/home/accountOptions" render={props => <AccountOptionsForm {...props}
          handleAccountOptionsClick={this.handleAccountOptionsClick}
          loggedIn={this.state.loggedIn}
          handleLogout={this.handleLogout}
          userSettings={this.state.userSettings}
        />} />
        <Route path="/home/map" render={props => <FullMap {...props}
          handleShowMapClick={this.handleShowMapClick}
          locations={this.state.locations}
          handleMapChoiceClick={this.handleMapChoiceClick}
          userSettings={this.state.userSettings}
          resetMarker={this.resetMarker}
        />} />
        <Route path="/home/accountRecovery" render={props => <AccountRecovery {...props}
          handleRecoveryAttempt={this.handleRecoveryAttempt}
        />} />
        <Route path="/reset/:token" render={props => <ResetPassword {...props} 
          handlePasswordReset={this.handlePasswordReset}
        />} />
        <Route path="/home/accountSettings" render={props => <AccountSettings {...props}
          applySettings={this.applySettings}
          userSettings={this.state.userSettings}
        />} />
        <Route path="/stats" render={props => <Stats {...props}
          userGames={this.state.userGames}
          navButtons={['Home', 'Dashboard', 'My Games', 'Sign Up or Login']}
          classes={['home', 'dashboard', 'myGames', 'login']}
          handleUserFormClick={this.handleUserFormClick}
          loggedIn={this.state.loggedIn}
          handleAccountOptionsClick={this.handleAccountOptionsClick}
        />} />
        {this.state.deadCenterFlashText &&
        <div className="deadCenterFlashTextContainer">
          <h2>{this.state.deadCenterFlashText}</h2>
        </div>}
        {this.state.loading &&
        <div className="loadingCenterScreen">
          <img src="/loading.gif" alt-src="loading image" height="100%" width="100%" />
        </div>}
      </div>
    );
  }
}

export default withRouter(App);
