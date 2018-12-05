import {
  LOGIN_ERROR,
  LOGIN_BUSY,
} from 'actions/login';

const initialState = {
  loginError: null,
  isLoginBusy: false,
};

const login = (state = initialState, action) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case LOGIN_BUSY:
      return { ...state, isLoginBusy: action.payload };
    case LOGIN_ERROR:
      return { ...state, loginError: action.payload };
    default:
      return state;
  }
};

export default login;
