import React from 'react';

class PieChartTooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.active) {
      return (
        <div className="pieChartTooltip">
          <h2>{this.props.payload[0].payload.location}</h2>
          <p>Games: {this.props.payload[0].payload.totalGames}</p>
          <p>{Math.round((this.props.payload[0].payload.totalGames / this.props.totalGames) * 10000) / 100}% of current filtered selection</p>
        </div>
      );
    }
    return null;
  }
}

export default PieChartTooltip;