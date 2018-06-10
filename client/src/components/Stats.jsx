import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import FilterMyGames from './FilterMyGames.jsx';
import MyGames from './MyGames.jsx';
import StatDashboard from './StatDashboard.jsx';


class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredUserGames: (this.props.userGames !== null ? this.props.userGames.slice() : null),
      filterOptions: {
        startLocation: 'all',
        deathLocation: 'all',
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
      }
    };

  }

  render() {
    return (
      <div id="StatsPageContainer">
        <Navbar
          navButtons={['Home', 'Dashboard', 'My Games', 'Sign Up or Login']}
          classes={['home', 'dashboard', 'myGames', 'login']}
          handleUserFormClick={this.props.handleUserFormClick}
          loggedIn={this.props.loggedIn}
          handleAccountOptionsClick={this.props.handleAccountOptionsClick}
        />
        <FilterMyGames filterOptions={this.state.filterOptions}/>
        <Route path="/stats/myGames" render={props => <MyGames {...props}
          userGames={this.props.userGames}
          filteredUserGames={this.state.filteredUserGames}
          confirmDeleteGameCard={this.props.confirmDeleteGameCard}
        />} />
        <Route path="/stats/dashboard" render={props => <StatDashboard {...props}
          userGames={this.props.userGames}
          filteredUserGames={this.state.filteredUserGames}
        />} />
      </div>
    );
  }
}

export default Stats;