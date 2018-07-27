import React from 'react';
import { Link } from 'react-router-dom';


const NavButton = (props) => {
  if (props.class === 'login' && props.loggedIn !== false) {
    return (
      <Link className="navButtonContainer" to="/home/accountOptions">
        <button data-step="9" data-intro="Press your account button to change user settings or replay this introduction!" className="navButton col-3 col-s-6 login" onClick={props.handleAccountOptionsClick}>
          {`${props.loggedIn}`}
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
        <button data-step="7" data-intro="You can choose to filter which locations the randomizer will choose from. Once you submit enough games, you can choose preset filter options based on your data" className={`navButton col-2 col-s-6 ${props.class}`} onClick={props.handleFilterClick}>
          {props.value}
        </button>
      </Link>
    );
  } else if (props.class === 'map') {
    return (
      <Link className="navButtonContainer" to="/home/map">
        <button data-step="6" data-intro="Instead of randomizing, you can choose which location you are dropping to by pressing on the location on the map" className={`navButton col-2 col-s-6 ${props.class}`} onClick={props.handleShowMapClick}>
          {props.value}
        </button>
      </Link>
    );
  } else if (props.class === 'stats' || props.class ==='dashboard') {
    return (
      <Link className="navButtonContainer" to="/stats/dashboard">
        <button data-step="8" data-intro="Once you have submitted games, you can check out your stats filtered by different metrics, and you can view, updated, and delete individual games" className={`navButton col-2 col-s-6 ${props.class}`} onClick={props.updateFilteredUserGames} >
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
