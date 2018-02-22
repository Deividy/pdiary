import projectDiary from '../projectDiary';
import ajaxAdapter from '../ajaxAdapter';
import localStorageAdapter from '../localStorageAdapter';

const { dispatch } = projectDiary.redux;
const initialState = null;

const actionTypes = {
  load: 'user_load',

  createStart: 'user_start_create',
  createError: 'user_error_create',
  createSuccess: 'user_success_create',

  loginStart: 'user_start_login',
  loginError: 'user_error_login',
  loginSuccess: 'user_success_login',

  logout: 'user_logout'
}

const actions = {
  load: function (user) {
    dispatch({ type: actionTypes.load, user });
  },

  logout: function () {
    localStorageAdapter().logout();
    dispatch({ type: actionTypes.logout });
  },

  login: async function (email, password) {
    const userData = { email, password };

    dispatch({ type: actionTypes.loginStart });
    try {
      const res = await ajaxAdapter().post('user/login', userData);
      const user = { email, jwt: res.jwt };

      dispatch({ type: actionTypes.loginSuccess, user });
      localStorageAdapter().saveUser(user);

      return user;
    } catch (ex) {
      dispatch({ type: actionTypes.loginError, msg: ex.message });
      throw ex; // rethrow
    }
  },

  create: async function (name, email, password) {
    const userData = { name, email, password };

    dispatch({ type: actionTypes.createStart });
    try {
      const res = await ajaxAdapter().post('user/create', userData);
      const user = { email, jwt: res.jwt };

      dispatch({ type: actionTypes.createSuccess, user });
      localStorageAdapter().saveUser(user);
      return user;

    } catch (ex) {
      dispatch({ type: actionTypes.createError, msg: ex.message });
      throw ex; // rethrow
    }
  }
};

function reducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.logout: return null;

    case actionTypes.createSuccess:
    case actionTypes.loginSuccess:
    case actionTypes.load: return action.user;

    default: return state;
  }
}

projectDiary.addRedux('user', { reducer, actions, actionTypes });
