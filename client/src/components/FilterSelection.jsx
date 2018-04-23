import React from 'react';

class FilterSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterState: '',
    };
  }

  componentDidMount() {
    if (this.props.filteredLocations.includes(this.props.location)) {
      this.setState({ filterState: 'filterSelection' });
    } else {
      this.setState({ filterState: 'filterSelection filteredOut' });
    }
  }

  handleFilterSelectionClick() {
    if (this.state.filterState === 'filterSelection') {
      this.setState({ filterState: 'filterSelection filteredOut' });
      this.props.filterOut(this.props.location);
    } else {
      this.setState({ filterState: 'filterSelection' });
      this.props.filterIn(this.props.location);
    }
  }

  render() {
    return (
      <div className={`${this.state.filterState}`} onClick={this.handleFilterSelectionClick.bind(this)}>
        <p>{this.props.location.name}</p>
      </div>
    );
  }
}

export default FilterSelection;
