import React from 'react';


const NavButton = (props) => {
  if (props.class === 'login' && props.loggedIn !== false) {
    return (
      <button className="navButton col-3 col-s-6 login" onClick={props.handleAccountOptionsClick}>
        {`Hey ${props.loggedIn}!`}
      </button>
    );
  } else if (props.class === 'login') {
    return (
      <button className={`navButton col-3 col-s-6 ${props.class}`} onClick={props.handleUserFormClick}>
        {props.value}
      </button>
    );
  } else if (props.class === 'filter') {
    return (
      <button className={`navButton col-2 col-s-6 ${props.class}`} onClick={props.handleFilterClick}>
        {props.value}
      </button>
    );
  } else if (props.class === 'map') {
    return (
      <button className={`navButton col-2 col-s-6 ${props.class}`} onClick={props.handleShowMapClick}>
        {props.value}
      </button>
    );
  }
  return (
    <button className={`navButton col-2 col-s-6 ${props.class}`}>
      {props.value}
    </button>
  );
};


export default NavButton;
