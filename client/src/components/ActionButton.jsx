import React from 'react';


const ActionButton = props => (
  <div id="actionButtonContainer">
    <button data-step="1" data-intro='Press this button to randomize a location to drop to' onClick={() => { props.handleActionClick(); props.resetMarker(); } } id="actionButton">Where We Droppin'</button>
  </div>
);

export default ActionButton;
