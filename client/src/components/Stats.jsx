import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import FilterMyGames from './FilterMyGames.jsx';
import MyGames from './MyGames.jsx';
import StatDashboard from './StatDashboard.jsx';


class Stats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="StatsPageContainer">
        <Navbar
          navButtons={['Home', 'Dashboard', 'My Games', 'Sign Up or Login']}
          classes={['home', 'dashboard', 'myGames', 'login']}
          // handleUserFormClick={this.props.handleUserFormClick}
          loggedIn={this.props.loggedIn}
          handleAccountOptionsClick={this.props.handleAccountOptionsClick}
        />
        <FilterMyGames 
          handleFiltering={this.props.handleFiltering}
          filterOptions={this.props.filterOptions}
          locations={this.props.locations}
        />
        <Route path="/stats/myGames" render={props => <MyGames {...props}
          userGames={this.props.userGames}
          filteredUserGames={this.props.filteredUserGames}
          confirmDeleteGameCard={this.props.confirmDeleteGameCard}
          locations={this.props.locations}
          updateLocalGame={this.props.updateLocalGame}
          handleNotCompliantEditGameSubmission={this.props.handleNotCompliantEditGameSubmission}
          statLoading={this.props.statLoading}
        />} />
        <Route path="/stats/dashboard" render={props => <StatDashboard {...props}
          userGames={this.props.userGames}
          filteredUserGames={this.props.filteredUserGames}
          data={this.props.dashboardData}
          statLoading={this.props.statLoading}
          getDashboardData={this.props.getDashboardData}
          getPieChartData={this.props.getPieChartData}
          pieChartData={this.props.pieChartData}
        />} />
      </div>
    );
  }
}

export default Stats;