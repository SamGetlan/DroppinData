import React from 'react';
import DashboardMap from './DashboardMap.jsx';
import PieChartTooltip from './PieChartTooltip.jsx';
import moment from 'moment';
import { Tooltip, Cell, PieChart, Pie, LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts';
class StatDashboard extends React.Component {
  constructor(props) {
    super(props);
    // this.colors = ['#E47866', '#E1768D', '#C681B1', '#9592C5', '#56A0C3', '#1AA8AA', '#35AA84', '#67A75C', '#959E3E', '#BE903A', '#DC8050' ];
    // this.colors = ['gray', 'green', 'blue', 'indigo', 'orange'];
    this.formatDate = this.formatDate.bind(this);
    this.renderPieLabel = this.renderPieLabel.bind(this);
  }

  componentDidMount() {
    if (this.props.filteredUserGames !== null && this.props.data === null) {
      this.props.getDashboardData(this.props.filteredUserGames);
      this.props.getPieChartData(this.props.filteredUserGames);
    }
  }

  formatDate(date) {
    return moment(date).calendar('l');
  }

  renderPieLabel(obj) {
    return obj.location;
  }

  render() {
    return (
      <div className="statDashboardContainer">
        {this.props.filteredUserGames !== null && 
        <DashboardMap arrowColor={this.props.arrowColor} filteredUserGames={this.props.filteredUserGames} />
        }
        {this.props.filteredUserGames !== null &&
        <div id="quickDashboardStats">
          <h1>Total Games: {(this.props.data !== null ? this.props.data.totalGames : 'N/A')}</h1>
          <h1>Average Place: {this.props.data !== null ? (Math.round((this.props.data.totalPlace / this.props.data.totalGames) * 100) / 100) : 'N/A'}</h1>
          <h1>Average Kills: {this.props.data !== null ? (Math.round((this.props.data.totalKills / this.props.data.totalGames) * 100) / 100) : 'N/A'}</h1>
          <h1>Average Loot: {this.props.data !== null ? (Math.round((this.props.data.totalLoot / this.props.data.totalGames) * 100) / 100) : 'N/A'}</h1>
          <PieChart width={250} height={250}>
            <Pie 
              data={this.props.pieChartData} 
              dataKey="totalGames" 
              fill="#8884d8" 
              // label={this.renderPieLabel}
            >
            {this.props.pieChartData !== null && this.props.pieChartData.map((entry, index) => <Cell fill={'indigo'} />)}
            </Pie>
            <Tooltip totalGames={(this.props.data !== null ? this.props.data.totalGames : null)} content={<PieChartTooltip />} />
          </PieChart>
        </div>}
        {this.props.filteredUserGames === null &&
        <div className="myGamesFlashTextContainer" >
          <h2>This account has no saved games!</h2>
        </div>}
        {this.props.statLoading &&
        <div className="loadingCenterScreen">
          <img src="/loading.gif" alt-src="loading image" height="100%" width="100%" />
        </div>}
        {this.props.filteredUserGames === null ||
          <div className="chartContainer">
            <div className="lineChart">
            <h2>Kills</h2>
            <ResponsiveContainer width='100%' height={300} >
              <LineChart width={500} height={300} data={this.props.filteredUserGames} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis  dataKey="date" tickFormatter={this.formatDate}/>
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
                  <XAxis  dataKey="date" tickFormatter={this.formatDate}/>
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
                  <XAxis  dataKey="date" tickFormatter={this.formatDate}/>
                  <YAxis />
                  <Legend />
                  <Line type="monotone" dataKey="loot" stroke="#f44283" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        }
      </div>
    );
  }
}


export default StatDashboard;