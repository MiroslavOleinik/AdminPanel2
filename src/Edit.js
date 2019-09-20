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
  }

  componentDidMount() {
    const { users } = this.props;
    const hrefSplited = window.location.href.split('/');
    const editedUserId = parseInt(hrefSplited[hrefSplited.length - 1]);
    console.log(typeof editedUserId);
    users.forEach((element) => {
      console.log(typeof element.id);
      if (element.id === editedUserId) {
        this.setState({
          userData: element,
        })
      }
    });
  }

  editUser(event) {
    event.preventDefault();
    const { userData } = this.state;
    const { users, editUserDispatch } = this.props;
    let userLogin = document.getElementById('login').value;
    let userPassword = document.getElementById('password').value;
    let userEmail = document.getElementById('email').value;
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
        message: 'User succesfuly updated.'
      });
    } else {
      this.setState({
        message: 'Error!'
      });
    }
  }

  render() {
    const { message } = this.state;
    return (
      <Fragment>
        <h2>Edit user</h2>
        <p>{message}</p>
        <form onSubmit={(event) => {this.editUser(event)}}>
          <FormInput name='login' id='login' label='Login' type='text'/>
          <FormInput name='password' id='password' label='Password' type='password'/>
          <FormInput name='email' id='email' label='Email' type='email'/>
          <button>Add</button>
        </form>
        <Link className="link" to="/">Back</Link>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
