import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn } from './Store';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import AdminPage from './AdminPage';
import Create from './Create';
import Edit from './Edit';
import './App.css';

const mapStateToProps = ({ loginStatus }) => ({
  loginStatus: loginStatus,
});

const mapDispatchToProps = (dispatch) => ({
  logInDispatch: (curBase) => {
    dispatch(logIn(curBase))
  },
});

class App extends Component {
  render() {
    const { loginStatus } = this.props;
    if (!loginStatus) {
      return (
        <LoginPage/>
      );
    }
    return (
      <BrowserRouter>
        <Route exact path='/' component={AdminPage}/>
        <Route path='/create' component={Create}/>
        <Route path='/edit' component={Edit}/>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
