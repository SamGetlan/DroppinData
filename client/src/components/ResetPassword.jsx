import React from 'react';
import { Link } from 'react-router-dom';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordsMatch: null,
    };
    this.passwordCheck = this.passwordCheck.bind(this);
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

  render() {
    return (
      <div id="userFormContainerWrapper">
        <div id="userFormContainer" className="mobile-85">
          <div id="userFormBox">
            <div id="userFormMain">
              <h2 id="userFormTitle">Reset Password</h2>
              <h4 id="userFormSubTitle">Please fill in this form to reset your password</h4>
              <form id="signUpForm">
                <label htmlFor="passwordInput" >Password</label>
                <input type="password" onChange={this.passwordCheck} placeholder="Enter New Password" id="passwordInput" className={this.state.passwordsMatch === true ? 'passwordsMatch' : (this.state.passwordsMatch === false ? 'passwordsNoMatch' : 'passwordsNotChecked')} />
                <label htmlFor="repeatPasswordInput" >Repeat Password {this.state.passwordsMatch === false && <span className="labelFalse"> - passwords do not match</span>}</label>
                <input type="password" onChange={this.passwordCheck} placeholder="Repeat New Password" id="repeatPasswordInput" className={this.state.passwordsMatch === true ? 'passwordsMatch' : (this.state.passwordsMatch === false ? 'passwordsNoMatch' : 'passwordsNotChecked')} />
              </form>
              {this.state.passwordsMatch === true &&
                <button id="submitSignUpForm" onClick={() => this.props.handlePasswordReset(document.getElementById('passwordInput').value)} >Reset Password</button> 
              }
              {this.state.passwordsMatch === true ||
                <button id="submitSignUpForm" className="disabled" >Reset Password</button>
              }
            </div>
          </div>
          <Link id="closeButtonContainer" to="/home">
            <button className="closeButton">Close</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ResetPassword;