import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn } from './Store';
import FormInput from './FormInput';

const mapStateToProps = ({ loginStatus, users }) => ({
  loginStatus: loginStatus,
  users: users,
});

const mapDispatchToProps = (dispatch) => ({
  logInDispatch: (value, login) => {
    dispatch(logIn(value, login))
  },
});

class LoginPage extends Component {
  state = {
    wrong: false
  }

  loginCheck(event) {
    event.preventDefault();
    
    const { users, logInDispatch } = this.props;
    const inputLogin = document.getElementById('login').value;
    const inputPassword = document.getElementById('password').value;
    users.forEach(({ login, password, deactivated }) => {
      if (deactivated === false) {
        if (inputPassword === password) {
          if(inputLogin === login) {
            logInDispatch(true, inputLogin);
          }
        } else {
          this.setState({
            wrong: true
          });
        }
      } else {
        this.setState({
          wrong: true
        });
      }
    });
  }

  render() {
    const { wrong } = this.state;
    return (
      <div className="login-page">
        {wrong === true ? <p>Wrong login or password</p> : <p></p>}
        <form onSubmit={(event) => (this.loginCheck(event))}>
          <FormInput name='login' id='login' label='Login' type='text'/>
          <FormInput name='password' id='password' label='Password' type='password'/>
          <button>Log in</button>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
