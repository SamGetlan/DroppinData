import React from 'react';
import { Link } from 'react-router-dom';

class AccountRecovery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validEmail: '',
      associatedEmail: '',
    }
    this.checkEmailValidity = this.checkEmailValidity.bind(this);
  }

  checkEmailValidity() {
    const context = this;
    let valid = false;
    let email;
    if (document.getElementById('emailInput')) {
      email = document.getElementById('emailInput').value;
    } else {
      email = [];
    }
    if (email.length > 0) {
      email = email.split('@');
      if (email[0].length > 0 && email[1] !== undefined) {
        email = email[1].split('.');
        if (email[1] !== undefined && email[1].length > 1) {
          console.log('valid email');
          valid = true;
          context.setState({
            validEmail: true,
          });
        }
      }
    }
    if (!valid) {
      console.log('invalid email');
      context.setState({
        validEmail: false,
      });
    }
  }

  render() {
    return (
      <div id={this.props.userSettings.stormBackground ? "userFormContainerWrapper" : 'userFormContainerWrapperNoStorm'}>
        <div id="userFormContainer" className="mobile-85">
          <div id="userFormBox">
            <div id="userFormMain">
              <h2 id="userFormTitle">Account Recovery</h2>
              <h4 id="userFormSubTitle">Please enter your email address associated with your account</h4>
              <form id="signUpForm">
                <label htmlFor="emailInput" >Email {this.state.validEmail === false && <span className="labelFalse"> - please enter a valid email</span>}</label>
                <input type="text" onChange={this.checkEmailValidity} placeholder="Email for account recovery" id="emailInput" className={this.state.validEmail === true ? 'passwordsMatch' : (this.state.validEmail === false ? 'passwordsNoMatch' : 'passwordsNotChecked')} />
              </form>
              {this.state.validEmail === true &&
                <button id="submitSignUpForm" onClick={() => this.props.handleRecoveryAttempt(document.getElementById('emailInput').value)} >Send Email</button> 
              }
              {this.state.validEmail === true ||
                <button id="submitSignUpForm" className="disabled" >Send Email</button>
              }
            </div>
          </div>
          <Link id="closeButtonContainer" to="/home">
            <button className="closeButton" onClick={this.props.handleUserFormClick}>Close</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default AccountRecovery;