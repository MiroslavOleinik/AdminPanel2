import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editUser } from './Store';
import FormInput from './FormInput';

const mapStateToProps = ({ users }) => ({
  users: users,
});

const mapDispatchToProps = (dispatch) => ({
  editUserDispatch: (value, id) => {
    dispatch(editUser(value, id))
  },
});

class Edit extends Component {
  state = {
    message: '',
    userData: {},
    formValue: {
      login: '',
      password: '',
      email: '',
    },
  }

  componentDidMount() {
    const { users } = this.props;
    const hrefSplited = window.location.href.split('/');
    const editedUserId = parseInt(hrefSplited[hrefSplited.length - 1]);
    users.forEach((element) => {
      if (element.id === editedUserId) {
        this.setState({
          userData: element,
          formValue: {
            login: element.login,
            password: element.password,
            email: element.email,
          },
        })
      }
    });
  }

  editUser(event) {
    event.preventDefault();
    const { userData, formValue } = this.state;
    const { users, editUserDispatch } = this.props;
    let userLogin = formValue.login;
    let userPassword = formValue.password;
    let userEmail = formValue.email;
    const usersLogins = users.map(({ login }) => {
      return login;
    });

    if (userLogin === '' || userLogin === ' ') {
      userLogin = userData.login;
    }
    if (userPassword === '' || userPassword === ' ') {
      userPassword = userData.password;
    }
    if (userEmail === '' || userEmail === ' ') {
      userEmail = userData.email;
    }

    const editedUser = {
      ...userData,
      login: userLogin,
      password: userPassword,
      email: userEmail,
    };
    
    if (usersLogins.indexOf(userLogin) === -1) {
      editUserDispatch(editedUser, userData.id);
      this.setState({
        message: 'User succesfuly updated.',
        formValue: {
          login: '',
          password: '',
          email: '',
        },
      });
    } else {
      this.setState({
        message: 'Error!'
      });
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
        <h2>Edit user</h2>
        <p>{message}</p>
        <form onSubmit={(event) => {this.editUser(event)}}>
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
          <button>Edit</button>
        </form>
        <Link className="link" to="/">Back</Link>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
