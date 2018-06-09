import React from 'react';
import { Link } from 'react-router-dom';


const NavButton = (props) => {
  if (props.class === 'login' && props.loggedIn !== false) {
    return (
      <Link className="navButtonContainer" to="/home/accountOptions">
        <button className="navButton col-3 col-s-6 login" onClick={props.handleAccountOptionsClick}>
          {`Hey ${props.loggedIn}!`}
        </button>
      </Link>
    );
  } else if (props.class === 'login') {
    return (
      <Link className="navButtonContainer" to="/home/login">
        <button className={`navButton col-3 col-s-6 ${props.class}`} onClick={props.handleUserFormClick}>
          {props.value}
        </button>
      </Link>
    );
  } else if (props.class === 'filter') {
    return (
      <Link className="navButtonContainer" to="/home/filterLocations">
        <button className={`navButton col-2 col-s-6 ${props.class}`} onClick={props.handleFilterClick}>
          {props.value}
        </button>
      </Link>
    );
  } else if (props.class === 'map') {
    return (
      <Link className="navButtonContainer" to="/home/map">
        <button className={`navButton col-2 col-s-6 ${props.class}`} onClick={props.handleShowMapClick}>
          {props.value}
        </button>
      </Link>
    );
  } else if (props.class === 'stats' || props.class ==='dashboard') {
    return (
      <Link className="navButtonContainer" to="/stats/dashboard">
        <button className={`navButton col-2 col-s-6 ${props.class}`} >
          {props.value}
        </button>
      </Link>
    );
  } else if (props.class === 'myGames') {
    return (
      <Link className="navButtonContainer" to="/stats/myGames">
      <button className={`navButton col-2 col-s-6 ${props.class}`}>
        {props.value}
      </button>
    </Link>
    );
  } else {
    return (
      <Link className="navButtonContainer" to="/home">
        <button className={`navButton col-2 col-s-6 ${props.class}`}>
          {props.value}
        </button>
      </Link>
    );
  }
};


export default NavButton;
