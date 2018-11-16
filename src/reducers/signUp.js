import {
  CREATE_USER_SUCCESS,
  CREATE_USER_BUSY,
  CREATE_USER_ERROR,
  RESET_SIGNUP_USER,
} from 'actions/signUp';

const initialState = {
  createUserError: null,
  isCreateUserBusy: false,
  createUserSuccess: null,
  updateUserError: null,
};

const signUp = (state = initialState, action) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case CREATE_USER_BUSY:
      return { ...state, isCreateUserBusy: action.payload };
    case CREATE_USER_SUCCESS:
      return { ...state, createUserSuccess: action.payload };
    case CREATE_USER_ERROR:
      return { ...state, createUserError: action.payload };
    case RESET_SIGNUP_USER:
      return { ...state, createUserError: null, isCreateUserBusy: false, createUserSuccess: null };
    default:
      return state;
  }
};

export default signUp;
