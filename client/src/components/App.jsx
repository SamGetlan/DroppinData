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
      filteredUserGames: null,
      submitButtonState: true,
      pieChartData: null,
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
      filterOptions: {
        startLocation: 'All',
        deathLocation: 'All',
        worstPlace: 100,
        bestPlace: 1,
        worstKills: 0,
        bestKills: 99,
        worstLoot: 0,
        bestLoot: 10,
        minDistanceTraveled: 0,
        maxDistanceTraveled: 3640,
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        timeStart: '00:00',
        timeEnd: '23:59',
      },
      statLoading: false,
      dashboardData: null,
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
    this.confirmDeleteGameCard = this.confirmDeleteGameCard.bind(this);
    this.updateFilteredUserGames = this.updateFilteredUserGames.bind(this);
    this.handleNotCompliantEditGameSubmission = this.handleNotCompliantEditGameSubmission.bind(this);
    this.updateLocalGame = this.updateLocalGame.bind(this);
    this.handleFilterOnStartLocation = this.handleFilterOnStartLocation.bind(this);
    this.getDashboardData = this.getDashboardData.bind(this);
    this.handleFilterOnPlace = this.handleFilterOnPlace.bind(this);
    this.handleFilterOnKills = this.handleFilterOnKills.bind(this);
    this.handleFilterOnLoot = this.handleFilterOnLoot.bind(this);
    this.handleFilterOnStormDeath = this.handleFilterOnStormDeath.bind(this);
    this.handleFilterOnDeathCoordinates = this.handleFilterOnDeathCoordinates.bind(this);
    this.handleFilterOnGameType = this.handleFilterOnGameType.bind(this);
    this.handleFiltering = this.handleFiltering.bind(this);
    this.getPieChartData = this.getPieChartData.bind(this);
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
          const user = (data.data.username);
          context.setState({
            loggedIn: user,
            userFormActive: false,
            logInFailed: false,
            userSettings: data.data.settings,
          });
          axios.get('/api/games')
            .then((data) => {
              const userGameData = context.getUserGameData(data.data);
              context.props.history.push('/home');
              context.setState({
                userGames: data.data,
                userGameData,
                loading: false,
              });
            });
        } else {
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
      });
  }

  filterIn(location) {
    if (this.state.filteredLocations.indexOf(location) === -1) {
      this.state.filteredLocations.push(location);
      const filteredLocations = this.state.filteredLocations;
      this.setState({ filteredLocations });
    }
  }

  filterOut(location) {
    const index = this.state.filteredLocations.indexOf(location);
    if (index !== -1) {
      this.state.filteredLocations.splice(index, 1);
      const filteredLocations = this.state.filteredLocations;
      this.setState({ filteredLocations });
    }
  }

  handleGameSubmit(place, kills, loot, gameType, stormDeath) {
    const context = this;
    this.setState({
      submitButtonState: false,
    })
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
    if (this.state.userGames !== null && this.state.userGames.length > 9) {
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
        deadCenterFlashText: `You need to save at least 10 games in order for pre-set filters to work`,
      });
      setTimeout(() => {
        context.setState({
          deadCenterFlashText: null,
        });
      }, 3000)
    }
  }

  handleNotCompliantEditGameSubmission(place, kills, loot) {
    const context = this;
    if (place < 1 || place > 100) {
      this.setState({
        deadCenterFlashText: 'Your place needs to be between 1 and 100',
      });
      setTimeout(() => context.setState({
        deadCenterFlashText: null,
      }), 2500);
    } else if (kills < 0 || kills > 99) {
      this.setState({
        deadCenterFlashText: 'Your kills need to be between 0 and 99',
      });
      setTimeout(() => context.setState({
        deadCenterFlashText: null,
      }), 2500);
    } else if (loot < 0 || loot > 10) {
      this.setState({
        deadCenterFlashText: 'Your loot rating needs to be between 0 and 10',
      });
      setTimeout(() => context.setState({
        deadCenterFlashText: null,
      }), 2500);
    }
  }

  notRecentGroupClick(gameType = 'all') {
    const context = this;
    const type = 'all';
    if (this.state.userGames !== null && this.state.userGames.length > 9) {
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
    const context = this;
    const type = 'all';
    if (this.state.userGames !== null && this.state.userGames.length > 9) {
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
    }
  }

  placeGroupClick() {
    const context = this;
    const type = 'all';
    if (this.state.userGames !== null && this.state.userGames.length > 9) {
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
    }
  }

  popularGroupClick() {
    const type = 'all';
    const context = this;
    if (this.state.userGames !== null && this.state.userGames.length > 9) {
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
      })
  }

  handlePasswordReset(password) {
    const context = this;
    axios.post('/api/resetPassword', {
      token: window.location.pathname.split('/')[2],
      password: password,
    })
      .then((data) => {
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
      })
  }

  applySettings(settings) {
    const context = this;
    axios.post('/api/applySettings', settings)
      .then((data) => {
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
      });
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
    const location = this.state.filteredLocations[this.state.activeIndex];
    const gridSpot = Number(e.target.id.split('Spot')[1])
    const rows = Math.floor(gridSpot / 72);
    const cols = (gridSpot % 72);
    const getCoordinate = (location, rows, cols) => {
      const { topLeft } = location;
      return [(topLeft[0] + rows), (topLeft[1] + cols)];
    }
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
    const rows = Math.floor(gridSpot / 84);
    const cols = (gridSpot % 84);
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

  confirmDeleteGameCard(gameId) {
    axios.delete('/api/games', { data: { gameId, } })
      .then((data) => {
          for (var i = 0; i < this.state.userGames.length; i++) {
            if (this.state.userGames[i]._id === data.data._id) {
              this.state.userGames.splice(i, 1);
              this.updateFilteredUserGames();
            }
          }
      })
      .catch(() => {
      });
  }

  updateFilteredUserGames() {
    this.setState({
      filteredUserGames: (this.state.userGames !== null ? this.state.userGames.slice() : null),
    })
  }

  updateLocalGame(id, newStats) {
    for (var i = 0; i < this.state.userGames.length; i++) {
      if (this.state.userGames[i]._id === id) {
        let game = this.state.userGames[i];
        game.startCoordinates = newStats.startCoordinates;
        game.deathCoordinates = newStats.deathCoordinates;
        game.date = newStats.date;
        game.location = newStats.location;
        game.place = newStats.place;
        game.kills = newStats.kills;
        game.loot = newStats.loot;
        game.gameType = newStats.gameType;
        game.stormDeath = newStats.stormDeath;
      }
    }
    this.updateFilteredUserGames();
  }

  getDashboardData(games) {
    this.setState({
      statLoading: true,
    });
    let dashboardData = {
      totalGames: 0,
      totalKills: 0,
      totalPlace: 0,
      totalLoot: 0,
    };
    const getPlace = (game) => {
      if (game.gameType === 'solo') {
        return game.place;
      } else if (game.gameType === 'duo') {
        return game.place * 2;
      } else if (game.gameType === 'squad') {
        return game.place * 4;
      }
    }
    for (var i = 0; i < games.length; i++) {
      dashboardData.totalGames++;
      dashboardData.totalKills += games[i].kills;
      dashboardData.totalPlace += getPlace(games[i]);
      dashboardData.totalLoot += games[i].loot;
    }
    this.setState({
      statLoading: false,
      dashboardData,
    })
  }

  handleFilterOnStartLocation(games, locations) {
    return games.filter(game => locations.indexOf(game.location) > -1);
  }

  handleFilterOnPlace(games, worstPlace, bestPlace) {
    return games.filter(game => (game.place >= bestPlace && game.place <= worstPlace));
  }

  handleFilterOnKills(games, minKills, maxKills) {
    return games.filter(game => (game.kills >= minKills && game.kills <= maxKills));
  }

  handleFilterOnLoot(games, minLoot, maxLoot) {
    return games.filter(game => (game.loot >= minLoot && game.loot <= maxLoot));
  }

  handleFilterOnStormDeath(games, stormDeath) {
    return games.filter(game => (game.stormDeath === stormDeath));
  }

  handleFilterOnDeathCoordinates(games, minRow, maxRow, minCol, maxCol) {
    return games.filter(game => (game.deathCoordinates[0] >= minRow && game.deathCoordinates[0] <= maxRow && game.deathCoordinates[1] >= minCol && game.deathCoordinates[1] <= maxCol));
  }

  handleFilterOnGameType(games, gameTypes) {
    return games.filter(game => gameTypes.indexOf(game.gameType) > -1);
  }

  handleFiltering(reset, gameTypes, locations, worstPlace, bestPlace, minKills, maxKills, minLoot, maxLoot, stormDeath, minRow, maxRow, minCol, maxCol) {
    let games = this.state.userGames.slice();
    if (reset) {
      this.setState({
        filteredUserGames: games,
      })
    } else {
      if (locations.length !== this.state.locations.length) {
        games = this.handleFilterOnStartLocation(games, locations);
      }
      if (gameTypes.length !== 3) {
        games = this.handleFilterOnGameType(games, gameTypes);
      }
      if (worstPlace !== 100 || bestPlace !== 1) {
        games = this.handleFilterOnPlace(games, worstPlace, bestPlace);
      }
      if (minKills !== 0 || maxKills !== 99) {
        games = this.handleFilterOnKills(games, minKills, maxKills);
      }
      if (minLoot !== 0 || maxLoot !== 10) {
        games = this.handleFilterOnLoot(games, minLoot, maxLoot);
      }
      if (stormDeath !== undefined) {
        games = this.handleFilterOnStormDeath(games, stormDeath);
      }
      if (minRow !== undefined && (minRow !== 0 || maxRow !== 84 || minCol !== 0 || maxCol !== 84)) {
        games = this.handleFilterOnDeathCoordinates(games, minRow, maxRow, minCol, maxCol);
      }
      this.setState({
        filteredUserGames: games,
      })
    }
    this.getDashboardData(games);
    this.getPieChartData(games);
  }

  getPieChartData(games) {
    const pieChartDataObject = {};
    for (var i = 0; i < games.length; i++) {
      if (pieChartDataObject[games[i].location]) {
        pieChartDataObject[games[i].location]++;
      } else {
        pieChartDataObject[games[i].location] = 1;
      }
    }
    const pieChartData = Object.keys(pieChartDataObject).map(location => {
      let locationObject = {};
      locationObject.location = location;
      locationObject.totalGames = pieChartDataObject[location];
      return locationObject;
    });
    this.setState({
      pieChartData,
    })
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
          updateFilteredUserGames={this.updateFilteredUserGames}
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
          updateFilteredUserGames={this.updateFilteredUserGames}
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
          confirmDeleteGameCard={this.confirmDeleteGameCard}
          filteredUserGames={this.state.filteredUserGames}
          filterOptions={this.state.filterOptions}
          updateFilteredUserGames={this.updateFilteredUserGames}
          locations={this.state.locations}
          updateLocalGame={this.updateLocalGame}
          handleFiltering={this.handleFiltering}
          handleNotCompliantEditGameSubmission={this.handleNotCompliantEditGameSubmission}
          dashboardData={this.state.dashboardData}
          statLoading={this.state.statLoading}
          getDashboardData={this.getDashboardData}
          getPieChartData={this.getPieChartData}
          pieChartData={this.state.pieChartData}
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
