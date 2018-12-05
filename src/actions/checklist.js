import knotDiaryApi from 'services/KnotDiaryApi';

export const SET_COUPLE_CHECKLIST = 'SET_COUPLE_CHECKLIST';

const getCoupleChecklist = (coupleId) => {
  return async (dispatch) => {
    const results = await knotDiaryApi.getCoupleChecklist(coupleId);
    if (results) {
      dispatch({ type: SET_COUPLE_CHECKLIST, payload: results });
    }
  };
};

const setCoupleChecklist = (payload) => ({ type: SET_COUPLE_CHECKLIST, payload });

export {
  setCoupleChecklist,
  getCoupleChecklist,
};
