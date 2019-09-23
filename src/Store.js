const initialState = JSON.parse(localStorage.initialState);

function setNewLocalStorage(state) {
  localStorage.clear();
  localStorage.setItem('initialState', JSON.stringify(state));
}

export function logIn(value, login) {
  return {
    type: 'LOG_IN',
    payload: value,
    incommingLogin: login,
  };
}

export function logOut() {
  return {
    type: 'LOG_OUT',
    payload: {
      loginStatus: false,
      currentUser: {},
    }
  };
}

export function addUser(value) {
  return {
    type: 'ADD_USER',
    payload: value,
  };
}

export function editUser(value, id) {
  return {
    type: 'EDIT_USER',
    payload: {
      newData: value,
      userId: id,
    },
  };
}

export function activateUser(value) {
  return {
    type: 'ACTIVATE_USER',
    payload: value,
  };
}

export function deactivateUser(value) {
  return {
    type: 'DEACTIVATE_USER',
    payload: value,
  };
}

export function adminPanel(state = initialState, action) {
  const { type, payload, incommingLogin } = action;
  let users = [ ...state.users ];
  switch (type) {
    case 'LOG_IN':
      let currentUser;
      users.map((element) => {
        if (element.login === incommingLogin) {
          currentUser = element;
        }
        return null;
      });
      state = {
        ...state,
        currentUser: currentUser,
        loginStatus: payload,
      };
      setNewLocalStorage(state);
      return state;
    case 'DEACTIVATE_USER':
      users.forEach((element) => {
        if (element.id === payload) {
          element.deactivated = true;
        }
      });
      state = {
        ...state,
        users: users,
      };
      setNewLocalStorage(state);
      return state;
    case 'ACTIVATE_USER':
      users.forEach((element) => {
        if (element.id === payload) {
          element.deactivated = false;
        }
      });
      state = {
        ...state,
        users: users,
      };
      setNewLocalStorage(state);
      return state;
    case 'ADD_USER':
      state = {
        ...state,
        users: [...users, payload],
      };
      setNewLocalStorage(state);
      return state;
    case 'LOG_OUT':
      state = {
        ...state,
        loginStatus: payload.loginStatus,
        currentUser: payload.currentUser,
      };
      setNewLocalStorage(state);
      return state;
    case 'EDIT_USER':
      const updatedUsers = users.map((element) => {
        if(payload.userId === element.id) {
          return payload.newData;
        } else {
          return element;
        }
      });
      state = {
        ...state,
        users: [ ...updatedUsers ],
      };
      setNewLocalStorage(state);
      return state;
    default:
      setNewLocalStorage(state);
      return state;
  }
}
