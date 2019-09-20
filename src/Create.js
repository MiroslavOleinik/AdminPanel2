import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUser } from './Store';
import FormInput from './FormInput';
import FormSelect from './FormSelect';

const mapStateToProps = ({ users }) => ({
  users: users,
});

const mapDispatchToProps = (dispatch) => ({
  addUserDispatch: (value) => {
    dispatch(addUser(value))
  },
});

class Create extends Component {
  state = {
    message: '',
  }

  addNewUser(event) {
    event.preventDefault();
    const { addUserDispatch, users } = this.props;
    const userLogin = document.getElementById('login').value;
    const userPassword = document.getElementById('password').value;
    const userRole = document.getElementById('role').value;
    const userEmail = document.getElementById('email').value;
    const usersLogins = users.map(({ login }) => {
      return login;
    });

    if (userLogin === '' || userLogin === ' ' ||
        userPassword === '' || userPassword === ' ') {
          this.setState({
            message: 'Error, check form fields.',
          });
    } else {
      if (usersLogins.indexOf(userLogin) === -1) {
        addUserDispatch({
          id: users.length,
          login: userLogin,
          password: userPassword,
          role: userRole,
          email: userEmail,
          deactivated: false,
        });
        this.setState({
          message: 'New user added.',
        });
      } else {
        this.setState({
          message: 'This username is already reserved',
        });
      }
    }
  }

  render() {
    const { message } = this.state;
    return (
      <Fragment>
        <h2>Create user</h2>
        <p>{message}</p>
        <form onSubmit={(event) => {this.addNewUser(event)}}>
          <FormInput name='login' id='login' label='Login' type='text'/>
          <FormInput name='password' id='password' label='Password' type='password'/>
          <FormInput name='email' id='email' label='Email' type='email'/>
          <FormSelect id='role' label='Role'/>
          <button>Add</button>
        </form>
        <Link className="link" to="/">Back</Link>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);
