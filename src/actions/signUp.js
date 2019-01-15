import { reactLocalStorage } from 'reactjs-localstorage';
import { SET_USER, SET_SESSION } from './user';
import gabbooApi from 'services/GabbooApi';

export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_BUSY = 'CREATE_USER_BUSY';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';
export const RESET_SIGNUP_USER = 'RESET_SIGNUP_USER';

const createUser = (user) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_USER_BUSY, payload: true });
    const accountCreatedFailedLoginMessage = 'Successfully created your account but failed to log you in. Please try to log-in manually.';

    try {
      const result = await gabbooApi.createUser(user);

      if (!result || !result.isSuccess || !result.data) {
        dispatch({ type: CREATE_USER_ERROR, payload: 'Something went wrong. Please try to reload the page.' });
        dispatch({ type: CREATE_USER_BUSY, payload: false });
        return;
      }

      const authToken = await gabbooApi.login(user.username, user.password);
      if (!authToken || !authToken.access_token) {
        dispatch({ type: CREATE_USER_ERROR, payload: accountCreatedFailedLoginMessage });
        dispatch({ type: CREATE_USER_BUSY, payload: false });
        return;
      }

      // set the token in local storage so it gets picked up 
      // and attached as Authorization header in next API call
      reactLocalStorage.setObject('auth-token', authToken);
      const userResult = await gabbooApi.getUser();
      if (!userResult || !userResult.data) {
        reactLocalStorage.setObject('auth-token', null);
        dispatch({ type: CREATE_USER_ERROR, payload: accountCreatedFailedLoginMessage });
        dispatch({ type: CREATE_USER_BUSY, payload: false });
        return;
      }

      reactLocalStorage.setObject('user', userResult.data);

      dispatch({ type: SET_USER, payload: userResult.data });
      dispatch({ type: SET_SESSION, payload: authToken });
      dispatch({ type: CREATE_USER_SUCCESS, payload: result.data });
      dispatch({ type: CREATE_USER_BUSY, payload: false });
    } catch (error) {
      dispatch({ type: CREATE_USER_ERROR, payload: error.message });
      dispatch({ type: CREATE_USER_BUSY, payload: false });
    }
  };
};

const resetSignupUser = () => ({ type: RESET_SIGNUP_USER });

export {
  createUser,
  resetSignupUser,
};
