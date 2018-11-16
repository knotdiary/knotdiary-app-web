import {
  HOME_IS_INITIALIZED,
} from 'actions/home';

const initialState = {
  isInitialized: false,
};

const home = (state = initialState, action) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case HOME_IS_INITIALIZED:
      return { ...state, isInitialized: action.payload };
    default:
      return state;
  }
};

export default home;
