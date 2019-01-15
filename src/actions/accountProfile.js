import { reactLocalStorage } from 'reactjs-localstorage';
import { SET_USER } from './user';
import gabbooApi from 'services/GabbooApi';

export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_BUSY = 'UPDATE_USER_BUSY';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';
export const RESET_ACCOUNT_PROFILE_FORM = 'RESET_ACCOUNT_PROFILE_FORM';

export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_BUSY = 'UPDATE_PASSWORD_BUSY';
export const UPDATE_PASSWORD_ERROR = 'UPDATE_PASSWORD_ERROR';
export const RESET_CHANGE_PASSWORD_FORM = 'RESET_CHANGE_PASSWORD_FORM';

const updateUser = (email, firstName, lastName, mobile, description) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_USER_BUSY, payload: true });

    try {
      const result = await gabbooApi.updateUser({
        firstName,
        lastName,
        mobile,
        email,
        description,
      });

      if (result && result.data) {
        reactLocalStorage.setObject('user', result.data);
        dispatch({ type: SET_USER, payload: result.data });
        dispatch({ type: UPDATE_USER_SUCCESS, payload: result.data });
      } else {
        dispatch({ type: UPDATE_USER_ERROR, payload: 'Failed to update your profile. Please try again.' });
      }

      dispatch({ type: UPDATE_USER_BUSY, payload: false });
    } catch (error) {
      dispatch({ type: UPDATE_USER_ERROR, payload: error.message });
      dispatch({ type: UPDATE_USER_BUSY, payload: false });
    }
  };
};

const updatePassword = (username, oldPassword, newPassword) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_PASSWORD_BUSY, payload: true });

    try {
      const result = await gabbooApi.updatePassword(username, oldPassword, newPassword);

      if (result && result.data) {
        reactLocalStorage.setObject('user', result.data);
        dispatch({ type: SET_USER, payload: result.data });
        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: result.data });
      } else {
        dispatch({ type: UPDATE_PASSWORD_ERROR, payload: 'Failed to update your password. Please try again.' });
      }

      dispatch({ type: UPDATE_PASSWORD_BUSY, payload: false });
    } catch (error) {
      dispatch({ type: UPDATE_PASSWORD_ERROR, payload: error.message });
      dispatch({ type: UPDATE_PASSWORD_BUSY, payload: false });
    }
  };
};

const updateUserAvatar = (username, file) => {
  return async (dispatch) => {
    const user = await gabbooApi.updateUserAvatar(username, file);

    if (user && user.data) {
      reactLocalStorage.setObject('user', user.data);
      dispatch({ type: SET_USER, payload: user.data });
    }
  };
};

const updateUserBackground = (username, file) => {
  return async (dispatch) => {
    const user = await gabbooApi.updateUserBackground(username, file);

    if (user && user.data) {
      reactLocalStorage.setObject('user', user.data);
      dispatch({ type: SET_USER, payload: user.data });
    }
  };
};

const resetAccountProfileForm = () => ({ type: RESET_ACCOUNT_PROFILE_FORM });

const resetChangePasswordForm = () => ({ type: RESET_CHANGE_PASSWORD_FORM });

export {
  updateUser,
  updatePassword,
  updateUserAvatar,
  updateUserBackground,
  resetAccountProfileForm,
  resetChangePasswordForm,
};
