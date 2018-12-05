import {
  SET_USER,
  SET_SESSION,
  GET_ACTIVE_USER_BUSY,
} from 'actions/user';

const initialState = {
  user: null,
  session: null,
  isGetActiveUserBusy: false,
};

const user = (state = initialState, action) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case GET_ACTIVE_USER_BUSY:
      return { ...state, isGetActiveUserBusy: action.payload };
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_SESSION:
      return { ...state, session: action.payload };
    default:
      return state;
  }
};

export default user;
