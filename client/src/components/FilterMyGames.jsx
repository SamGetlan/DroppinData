import React from 'react';

const FilterMyGames = props => (
  <div>
  <h1>Filter Options Goes Here</h1>
    <select onChange={(e) => props.handleFilterOnStartLocation(e.target.value)}>
      <option value="All" selected={props.filterOptions.startLocation === 'All'}>All Locations</option>
      {props.locations.map(location => 
      <option value={location.name} selected={location.name === props.filterOptions.startLocation} >{location.name}</option>
      )}
    </select>
  </div>
)

export default FilterMyGames;