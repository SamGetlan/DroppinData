import React from 'react';
import DashboardMap from './DashboardMap.jsx';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts';


class StatDashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('statDashboard mounting');
    console.log('this.props.filteredUserGames:', this.props.filteredUserGames);
    if (this.props.filteredUserGames !== null && this.props.data === null) {
      console.log('inside conditional of statDasboard mounting');
      this.props.getDashboardData(this.props.filteredUserGames);
    }
  }

  render() {
    return (
      <div className="statDashboardContainer">
        {this.props.filteredUserGames !== null && 
        <DashboardMap filteredUserGames={this.props.filteredUserGames} />
        }
        {this.props.filteredUserGames !== null &&
        <div id="quickDashboardStats">
          <h1>Total Games: {(this.props.data !== null ? this.props.data.totalGames : 'N/A')}</h1>
          <h1>Average Place: {this.props.data !== null ? (Math.round((this.props.data.totalPlace / this.props.data.totalGames) * 100) / 100) : 'N/A'}</h1>
          <h1>Average Kills: {this.props.data !== null ? (Math.round((this.props.data.totalKills / this.props.data.totalGames) * 100) / 100) : 'N/A'}</h1>
          <h1>Average Loot: {this.props.data !== null ? (Math.round((this.props.data.totalLoot / this.props.data.totalGames) * 100) / 100) : 'N/A'}</h1>
        </div>}
        {this.props.filteredUserGames === null &&
        <div className="myGamesFlashTextContainer" >
          <h2>This account has no saved games!</h2>
        </div>}
        {this.props.statLoading &&
        <div className="loadingCenterScreen">
          <img src="/loading.gif" alt-src="loading image" height="100%" width="100%" />
        </div>}
        <div className="chartContainer">
          <div className="lineChart">
          <h2>Kills</h2>
          <ResponsiveContainer width='100%' height={300} >
            <LineChart width={500} height={300} data={this.props.filteredUserGames} >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis  dataKey="location"/>
              <YAxis />
              <Legend />
              <Line type="monotone" dataKey="kills" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
          </div>
          <div className="lineChart">
            <h2>Place</h2>
            <ResponsiveContainer width='100%' height={300} >
              <LineChart width={500} height={300} data={this.props.filteredUserGames} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis  dataKey="location"/>
                <YAxis />
                <Legend />
                <Line type="monotone" dataKey="place" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="lineChart">
            <h2>Loot</h2>
            <ResponsiveContainer width='100%' height={300} >
              <LineChart width={500} height={300} data={this.props.filteredUserGames} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis  dataKey="location"/>
                <YAxis />
                <Legend />
                <Line type="monotone" dataKey="loot" stroke="#f44283" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }
}


export default StatDashboard;