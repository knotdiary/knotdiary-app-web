import {
  SET_COUPLE_CHECKLIST,
} from 'actions/checklist';

const initialState = {
  checklist: [],
};

const checklist = (state = initialState, action) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case SET_COUPLE_CHECKLIST:
      return { ...state, checklist: action.payload };
    default:
      return state;
  }
};

export default checklist;
