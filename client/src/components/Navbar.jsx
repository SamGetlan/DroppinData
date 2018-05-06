import React from 'react';
import NavButton from './NavButton.jsx';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  renderNavButton(i) {
    return (
      <NavButton
        loggedIn={this.props.loggedIn}
        value={this.props.navButtons[i]}
        class={this.props.classes[i]}
        handleUserFormClick={this.props.handleUserFormClick}
        handleFilterClick={this.props.handleFilterClick}
        handleAccountOptionsClick={this.props.handleAccountOptionsClick}
      />
    );
  }

  render() {
    return (
      <div className="navbar row">
        {this.renderNavButton(0)}
        {this.renderNavButton(1)}
        {this.renderNavButton(2)}
        {this.renderNavButton(3)}
      </div>
    );
  }
}

export default Navbar;
