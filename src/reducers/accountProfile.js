import {
  UPDATE_USER_SUCCESS,
  UPDATE_USER_BUSY,
  UPDATE_USER_ERROR,
  RESET_ACCOUNT_PROFILE_FORM,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_BUSY,
  UPDATE_PASSWORD_ERROR,
  RESET_CHANGE_PASSWORD_FORM,

} from 'actions/accountProfile';

const initialState = {
  updateUserError: null,
  isUpdateUserBusy: false,
  updateUserSuccess: null,
  updatePasswordError: null,
  isUpdatePasswordBusy: false,
  updatePasswordSuccess: null,
};

const accountProfile = (state = initialState, action) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case UPDATE_USER_BUSY:
      return { ...state, isUpdateUserBusy: action.payload };
    case UPDATE_USER_SUCCESS:
      return { ...state, updateUserSuccess: action.payload };
    case UPDATE_USER_ERROR:
      return { ...state, updateUserError: action.payload };
    case RESET_ACCOUNT_PROFILE_FORM:
      return { ...state, updateUserError: null, isUpdateUserBusy: false, updateUserSuccess: null };
    case UPDATE_PASSWORD_BUSY:
      return { ...state, isUpdatePasswordBusy: action.payload };
    case UPDATE_PASSWORD_SUCCESS:
      return { ...state, updatePasswordSuccess: action.payload };
    case UPDATE_PASSWORD_ERROR:
      return { ...state, updatePasswordError: action.payload };
    case RESET_CHANGE_PASSWORD_FORM:
      return { ...state, updatePasswordError: null, isUpdatePasswordBusy: false, updatePasswordSuccess: null };
    default:
      return state;
  }
};

export default accountProfile;
