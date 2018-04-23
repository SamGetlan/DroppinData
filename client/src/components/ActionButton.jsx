import React from 'react';


const ActionButton = props => (
  <div id="actionButtonContainer">
    <button onClick={props.handleActionClick} id="actionButton">Where We Droppin'</button>
  </div>
);

export default ActionButton;
