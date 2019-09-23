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
    formValue: {
      login: '',
      password: '',
      email: '',
      role: 'user',
    },
  }

  addNewUser(event) {
    event.preventDefault();
    const { formValue } = this.state;
    const { addUserDispatch, users } = this.props;
    const userLogin = formValue.login;
    const userPassword = formValue.password;
    const userRole = formValue.role;
    const userEmail = formValue.email;
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

  onChangeHandler({ target: { value } }, property) {
    this.setState(({ formValue }) => {
      formValue[property] = value;
      return {
        value: value,
      }
    });
  }

  render() {
    const { message, formValue } = this.state;
    return (
      <Fragment>
        <h2>Create user</h2>
        <p>{message}</p>
        <form onSubmit={(event) => {this.addNewUser(event)}}>
          <FormInput
            name='login'
            id='login'
            label='Login'
            type='text'
            value={formValue.login}
            onchange={(event) => {this.onChangeHandler(event, 'login')}}/>
          <FormInput
            name='password'
            id='password'
            label='Password'
            type='password'
            value={formValue.password}
            onchange={(event) => {this.onChangeHandler(event, 'password')}}/>
          <FormInput
            name='email'
            id='email'
            label='Email'
            type='email'
            value={formValue.email}
            onchange={(event) => {this.onChangeHandler(event, 'email')}}/>
          <FormSelect
            id='role'
            label='Role'
            onchange={(event) => {this.onChangeHandler(event, 'role')}}/>
          <button>Add</button>
        </form>
        <Link className="link" to="/">Back</Link>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);
