const initialState = {
  loginStatus: true,
  roles: ['user', 'admin', 'moderator',],
  currentUser: {
    id: 0,
    login: 'admin',
    password: 'password',
    role: 'admin',
    email: 'ollmirik@gmail.com',
    deactivated: false,
  },
  users: [{
    id: 0,
    login: 'admin',
    password: 'password',
    role: 'admin',
    email: 'ollmirik@gmail.com',
    deactivated: false,
  },{
    id: 1,
    login: 'user',
    password: 'password',
    role: 'user',
    email: 'ollmirik@gmail.com',
    deactivated: false,
  },{
    id: 2,
    login: 'moderator',
    password: 'password',
    role: 'moderator',
    email: 'ollmirik@gmail.com',
    deactivated: false,
  }],
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
      return {
        ...state,
        currentUser: currentUser,
        loginStatus: payload,
      };
    case 'DEACTIVATE_USER':
      users.forEach((element) => {
        if (element.id === payload) {
          element.deactivated = true;
        }
        console.log(element)
      });
      return {
        ...state,
        users: users,
      };
    case 'ACTIVATE_USER':
      users.forEach((element) => {
        if (element.id === payload) {
          element.deactivated = false;
        }
        console.log(element)
      });
      return {
        ...state,
        users: users,
      };
    case 'ADD_USER':
      return {
        ...state,
        users: [...users, payload],
      };
    case 'LOG_OUT':
      return {
        ...state,
        loginStatus: payload.loginStatus,
        currentUser: payload.currentUser,
      };
    case 'EDIT_USER':
      const updatedUsers = users.map((element) => {
        if(payload.userId === element.id) {
          return payload.newData;
        } else {
          return element;
        }
      });
      return {
        ...state,
        users: [ ...updatedUsers ],
      }
    default:
      return state;
  }
}
