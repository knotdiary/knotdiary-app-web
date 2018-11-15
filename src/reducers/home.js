import {
  SET_COUPLE_BANNER_DATA,
} from 'actions/home';

const initialState = {
  coupleInfo: null,
};

const home = (state = initialState, action) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case SET_COUPLE_BANNER_DATA:
      return { ...state, coupleInfo: action.payload };
    default:
      return state;
  }
};

export default home;
