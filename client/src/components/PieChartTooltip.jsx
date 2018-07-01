import React from 'react';

class PieChartTooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.active) {
      console.log(this.props.payload[0]);
      return (
        <div className="pieChartTooltip">
          <p>Hey {this.props.payload[0].payload.location}</p>
        </div>
      );
    }
    return null;
  }
}

export default PieChartTooltip;