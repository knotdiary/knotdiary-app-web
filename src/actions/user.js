import { reactLocalStorage } from 'reactjs-localstorage';
import gabbooApi from 'services/GabbooApi';

export const SET_USER = 'SET_USER';
export const SET_SESSION = 'SET_SESSION';
export const GET_ACTIVE_USER_BUSY = 'GET_ACTIVE_USER_BUSY';

const getUser = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ACTIVE_USER_BUSY, payload: true });

    const tokenObject = reactLocalStorage.getObject('auth-token');
    if (tokenObject && tokenObject.access_token) {
      const user = await gabbooApi.getUser();

      if (user && user.data) {
        reactLocalStorage.setObject('user', user.data);
        dispatch({ type: SET_USER, payload: user.data });
        dispatch({ type: SET_SESSION, payload: tokenObject });
      } else {
        reactLocalStorage.setObject('user', null);
        reactLocalStorage.setObject('auth-token', null);
      }
    }

    dispatch({ type: GET_ACTIVE_USER_BUSY, payload: false });
  };
}

const setUser = (payload) => ({ type: SET_USER, payload: payload });

export {
  setUser,
  getUser,
};
