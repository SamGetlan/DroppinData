import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordsMatch: null,
      usernameUniq: null,
      validEmail: '',
    };
    this.passwordCheck = this.passwordCheck.bind(this);
    this.checkUsername = this.checkUsername.bind(this);
    this.checkEmailValidity = this.checkEmailValidity.bind(this);
  }

  passwordCheck() {
    const password = document.getElementById('passwordInput').value;
    const repeatPassword = document.getElementById('repeatPasswordInput').value;
    if (password === repeatPassword) {
      this.setState({
        passwordsMatch: true,
      });
    } else {
      this.setState({
        passwordsMatch: false,
      });
    }
  }

  checkUsername() {
    const context = this;
    console.log('inside checkUsername');
    const username = document.getElementById('usernameInput').value;
    axios.post('/api/checkUsername', {
      username,
    })
      .then((data) => {
        console.log(data.data);
        if (data.data === null) {
          context.setState({
            usernameUniq: true,
          });
        } else {
          context.setState({
            usernameUniq: false,
          });
        }
      })
      .catch((err) => {
        console.log('There was an error:', err);
      });
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
      <div id="userFormContainerWrapper">
        <div id="userFormContainer" className="mobile-85">
          <div id="userFormBox">
            <div id="userFormOptionsBar">
              <button className="userFormOptionsButton" id="loginUserFormOptionButton" onClick={this.props.loginUserFormOption}>Login</button>
              <button className="userFormOptionsButton" id="signUpUserFormOptionButton" onClick={this.props.signUpUserFormOption}>Sign Up</button>
            </div>
            {this.props.signUpForm ||
            <div id="userFormMain">
              <h2 id="userFormTitle">Log In</h2>
              <h4 id="userFormSubTitle">Please fill in your username and password to login</h4>
              <Link to="/home/accountRecovery">
                <p id="forgotPasswordLink">Forgot username/password?</p>
              </Link>
              <form id="signUpForm">
                <label htmlFor="usernameInput" >Username {this.props.logInFailed === true && <span className="labelFalse"> - username or password is incorrect</span>}</label>
                <input type="text" placeholder="Enter Username" id="usernameInput" />
                <label htmlFor="passwordInput" >Password {this.props.logInFailed === true && <span className="labelFalse"> - username or password is incorrect</span>}</label>
                <input type="password" placeholder="Enter Password" id="passwordInput" />
              </form>
              <button id="submitSignUpForm" onClick={() => this.props.handleAccountSignIn(document.getElementById('usernameInput').value, document.getElementById('passwordInput').value)} >Log In</button>
            </div>}
            {this.props.signUpForm &&
            <div id="userFormMain">
              <h2 id="userFormTitle">Sign Up</h2>
              <h4 id="userFormSubTitle">Please fill in this form to create an account</h4>
              <form id="signUpForm">
                <label htmlFor="usernameInput" className={this.state.usernameUniq === false ? 'label labelFalse' : (this.state.usernameUniq === true ? 'label labelTrue' : 'label')}>{this.state.usernameUniq === false ? 'Username taken' : (this.state.usernameUniq === true ? 'Username available' : 'Username')}</label>
                <input type="text" onBlur={this.checkUsername} placeholder="Enter Username" id="usernameInput" className={this.state.usernameUniq === true ? 'usernameUniq' : (this.state.usernameUniq === false ? 'usernameTaken' : 'usernameNotChecked')} />
                <label htmlFor="passwordInput" >Password</label>
                <input type="password" onChange={this.passwordCheck} placeholder="Enter Password" id="passwordInput" className={this.state.passwordsMatch === true ? 'passwordsMatch' : (this.state.passwordsMatch === false ? 'passwordsNoMatch' : 'passwordsNotChecked')} />
                <label htmlFor="repeatPasswordInput" >Repeat Password {this.state.passwordsMatch === false && <span className="labelFalse"> - passwords do not match</span>}</label>
                <input type="password" onChange={this.passwordCheck} placeholder="Repeat Password" id="repeatPasswordInput" className={this.state.passwordsMatch === true ? 'passwordsMatch' : (this.state.passwordsMatch === false ? 'passwordsNoMatch' : 'passwordsNotChecked')} />
                <label htmlFor="emailInput" >Email {this.state.validEmail === false && <span className="labelFalse"> - please enter a valid email</span>}</label>
                <input type="text" onChange={this.checkEmailValidity} placeholder="Email for account recovery" id="emailInput" className={this.state.validEmail === true ? 'passwordsMatch' : (this.state.validEmail === false ? 'passwordsNoMatch' : 'passwordsNotChecked')} />
              </form>
              {(this.state.passwordsMatch === true && this.state.usernameUniq === true) &&
                <button id="submitSignUpForm" onClick={() => this.props.handleAccountSignUp(document.getElementById('usernameInput').value, document.getElementById('passwordInput').value, document.getElementById('emailInput').value)} >Submit</button> 
              }
              {(this.state.passwordsMatch === true && this.state.usernameUniq === true) ||
                <button id="submitSignUpForm" className="disabled" >Submit</button>
              }
            </div>}
          </div>
          <Link id="closeButtonContainer" to="/home">
            <button className="closeButton" onClick={this.props.handleUserFormClick}>Close</button>
          </Link>
        </div>
      </div>
    );
  }
}


export default UserForm;
