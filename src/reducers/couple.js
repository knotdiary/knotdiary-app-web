import {
  SET_COUPLE_INFO,
} from 'actions/couple';

const initialState = {
  coupleInfo: null,
};

const couple = (state = initialState, action) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case SET_COUPLE_INFO:
      return { ...state, coupleInfo: action.payload };
    default:
      return state;
  }
};

export default couple;
