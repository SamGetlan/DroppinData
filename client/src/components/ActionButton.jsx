import React from 'react';


const ActionButton = props => (
  <div id="actionButtonContainer">
    <button onClick={() => { props.handleActionClick(); props.resetMarker(); } } id="actionButton">Where We Droppin'</button>
  </div>
);

export default ActionButton;
