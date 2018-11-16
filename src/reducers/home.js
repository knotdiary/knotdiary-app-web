import {
  SET_COUPLE_BANNER_DATA,
  SET_HOME_CHECKLIST_DATA,
  HOME_IS_INITIALIZED,
} from 'actions/home';

const initialState = {
  coupleInfo: null,
  checklist: [],
  isInitialized: false,
};

const home = (state = initialState, action) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case SET_COUPLE_BANNER_DATA:
      return { ...state, coupleInfo: action.payload };
    case SET_HOME_CHECKLIST_DATA:
      return { ...state, checklist: action.payload };
    case HOME_IS_INITIALIZED:
      return { ...state, isInitialized: action.payload };
    default:
      return state;
  }
};

export default home;
