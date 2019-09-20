import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deactivateUser, activateUser, logOut } from './Store';

const mapStateToProps = ({ users, currentUser }) => ({
  currentUser: currentUser,
  users: users,
});

const mapDispatchToProps = (dispatch) => ({
  deactivateUserDispatch: (value) => {
    dispatch(deactivateUser(value))
  },
  activateUserDispatch: (value) => {
    dispatch(activateUser(value))
  },
  logOutDispatch: () => {
    dispatch(logOut())
  },
});

class AdminPage extends Component {
  setActivityFlag(element) {
    const { activateUserDispatch, deactivateUserDispatch } = this.props;
    if(element.deactivated === true) {
      activateUserDispatch(element.id);
    } else {
      deactivateUserDispatch(element.id);
    }
    this.setState();
  }

  logOut() {
    const { logOutDispatch } = this.props;
    logOutDispatch();
  }

  render() {
    const { currentUser, users } = this.props;
    return (
      <Fragment>
        <h2>Admin panel</h2>
        <button className="button logout" onClick={()=>{this.logOut()}}>Log Out</button>
        <table className="table">
          <thead>
            <tr>
              <td>Id</td>
              <td>Username</td>
              <td>Password</td>
              <td>Email</td>
              <td>Role</td>
              <td>Edit</td>
              <td>User control</td>
            </tr>
          </thead>
          <tbody>
            {users.map((element) => {
              return (
                <tr key={`${element.login}${element.id}`}>
                  <td>{element.id}</td>
                  <td>{element.login}</td>
                  <td>{element.password}</td>
                  <td>{element.email}</td>
                  <td>{element.role}</td>
                  <td><Link
                    className="link"
                    element={element}
                    to={`/edit/${element.id}`}>
                    Edit</Link>
                  </td>
                  <td>{element.id === currentUser.id ?
                    (<span>Current user</span>) :
                    (<button onClick={() => {this.setActivityFlag(element)}}>
                      {element.deactivated ? 'Activate' : 'Deactivated'}
                    </button>)}
                  </td>
                </tr>)
            })}
          </tbody>
        </table>
        <Link className="link" to="create">Create New User</Link>
      </Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
