import React from 'react';
import FilterSelection from './FilterSelection.jsx';
import { Link } from 'react-router-dom';

const FilterLocations = props => (
  <div id={props.userSettings.stormBackground ? "userFormContainerWrapper" : 'userFormContainerWrapperNoStorm'}>
    <div id="filterLocationsContainer">
      <div id="filterGroupingsButtonContainer">
        <button id="hardGroupButton" className="filterGroupButton"onClick={props.hardGroupClick}>Give me a challenge</button>
        <button id="notRecentGroupButton" className="filterGroupButton"onClick={props.notRecentGroupClick}>It has been in a while</button>
        <button id="killsGroupButton" className="filterGroupButton"onClick={props.killsGroupClick}>I want kills</button>
        <button id="placeGroupButton" className="filterGroupButton"onClick={props.placeGroupClick}>Let's get the win</button>
        <button id="popularGroupButton" className="filterGroupButton"onClick={props.popularGroupClick}>The faves</button>
      </div>
      <div id="filterLocationsBox">
        {props.locations.map((location, i) => <FilterSelection key={`loc${i}`} location={location} filteredLocations={props.filteredLocations} filterOut={props.filterOut} filterIn={props.filterIn} userSettings={props.userSettings}/>)}
      </div>
      <div id="closeButtonContainer">
        <button id="filterAllInButton" className="closeButton" onClick={props.filterAllIn}>Filter All In</button>
        <Link to='/home'>
          <button className="closeButton" onClick={props.handleFilterClick}>Close</button>
        </Link>
        <button id="filterAllOutButton" className="closeButton" onClick={props.filterAllOut}>Filter All Out</button>
      </div>
    </div>
  </div>
);

export default FilterLocations;
