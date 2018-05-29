import React from 'react';
import { Link } from 'react-router-dom';


const NavButton = (props) => {
  if (props.class === 'login' && props.loggedIn !== false) {
    return (
      <Link className="navButtonContainer" to="/accountOptions">
        <button className="navButton col-3 col-s-6 login" onClick={props.handleAccountOptionsClick}>
          {`Hey ${props.loggedIn}!`}
        </button>
      </Link>
    );
  } else if (props.class === 'login') {
    return (
      <Link className="navButtonContainer" to="/login">
        <button className={`navButton col-3 col-s-6 ${props.class}`} onClick={props.handleUserFormClick}>
          {props.value}
        </button>
      </Link>
    );
  } else if (props.class === 'filter') {
    return (
      <Link className="navButtonContainer" to="/filterLocations">
        <button className={`navButton col-2 col-s-6 ${props.class}`} onClick={props.handleFilterClick}>
          {props.value}
        </button>
      </Link>
    );
  } else if (props.class === 'map') {
    return (
      <Link className="navButtonContainer" to="/map">
        <button className={`navButton col-2 col-s-6 ${props.class}`} onClick={props.handleShowMapClick}>
          {props.value}
        </button>
      </Link>
    );
  }
  return (
    <div className="navButtonContainer">
      <button className={`navButton col-2 col-s-6 ${props.class}`}>
        {props.value}
      </button>
    </div>
  );
};


export default NavButton;
