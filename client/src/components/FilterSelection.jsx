import React from 'react';

class FilterSelection extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFilterSelectionClick() {
    if (this.props.filteredLocations.includes(this.props.location)) {
      this.props.filterOut(this.props.location);
    } else {
      this.props.filterIn(this.props.location);
    }
  }

  render() {
    return (
      <div className={this.props.filteredLocations.includes(this.props.location) ? 'filterSelection' : 'filterSelection filteredOut'} onClick={this.handleFilterSelectionClick.bind(this)}>
        <p>{this.props.location.name}</p>
      </div>
    );
  }
}

export default FilterSelection;
