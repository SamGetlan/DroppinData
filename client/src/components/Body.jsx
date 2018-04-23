import React from 'react';
import ActionButton from './ActionButton.jsx';
import BackSplash from './BackSplash.jsx';
import ActiveTile from './ActiveTile.jsx';
import StatBox from './StatBox.jsx';

const Body = props => (
  <div>
    <ActionButton handleActionClick={props.handleActionClick} />
    {props.active !== false &&
      <div className="activeTileContainer">
        <ActiveTile location={props.filteredLocations[props.activeIndex]} />
        <StatBox handleSubmit={props.handleSubmit} />
      </div>
    }
    <BackSplash filteredLocations={props.filteredLocations} />
  </div>
);

export default Body;
