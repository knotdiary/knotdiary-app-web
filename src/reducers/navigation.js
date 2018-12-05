import {
  SET_CURRENT_PAGE,
} from 'actions/navigation';

const initialState = {
  currentPage: null,
};

const navigation = (state = initialState, action) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

export default navigation;
