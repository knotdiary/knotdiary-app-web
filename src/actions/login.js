import { reactLocalStorage } from 'reactjs-localstorage';
import { toast } from "react-toastify";
import { SET_USER, SET_SESSION } from './user';
import knotDiaryApi from 'services/KnotDiaryApi';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_BUSY = 'LOGIN_BUSY';

const login = (username, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_BUSY, payload: true });

    try {
      const authToken = await knotDiaryApi.login(username, password);
      if (authToken && authToken.access_token) {
        reactLocalStorage.setObject('auth-token', authToken);

        const user = await knotDiaryApi.getUser();

        if (!user || !user.data) {
          dispatch({ type: LOGIN_ERROR, payload: 'Failed to login. Please try again.' });
        }

        const coupleData = await knotDiaryApi.getCoupleInfo(user.data.username);
        if (!coupleData || !coupleData.data) {
          dispatch({ type: LOGIN_ERROR, payload: 'Failed to login. Please try again.' });
        }

        reactLocalStorage.setObject('user', user.data);
        reactLocalStorage.setObject('couple', coupleData.data);
        dispatch({ type: SET_USER, payload: user.data });
        dispatch({ type: SET_SESSION, payload: authToken });
      } else {
        reactLocalStorage.setObject('auth-token', null);
        dispatch({ type: LOGIN_ERROR, payload: 'Failed to login. Please try again.' });
      }

      dispatch({ type: LOGIN_BUSY, payload: false });
    } catch (error) {
      reactLocalStorage.setObject('user', null);
      reactLocalStorage.setObject('auth-token', null);
      dispatch({ type: LOGIN_ERROR, payload: error.message });
      dispatch({ type: LOGIN_BUSY, payload: false });
    }
  };
};

const logout = () => {
  return async (dispatch) => {
    reactLocalStorage.setObject('user', null);
    reactLocalStorage.setObject('auth-token', null);
    dispatch({ type: SET_USER, payload: null });
    dispatch({ type: SET_SESSION, payload: null });
    toast.info(`You've successfully logged out`);
  };
};

export {
  login,
  logout,
};
