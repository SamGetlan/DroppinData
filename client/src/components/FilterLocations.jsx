import React from 'react';
import FilterSelection from './FilterSelection.jsx';

const FilterLocations = props => (
  <div id="filterLocationsContainerWrapper">
    <div id="filterLocationsContainer">
      <button id="x"onClick={props.handleFilterClick} >X</button>
      <div id="filterLocationsBox">
        {props.locations.map(location => <FilterSelection location={location} filteredLocations={props.filteredLocations} filterOut={props.filterOut} filterIn={props.filterIn} />)}
      </div>
      <div id="closeButtonContainer">
        <button id="close" onClick={props.handleFilterClick}>Close</button>
      </div>
    </div>
  </div>
);

export default FilterLocations;
