import gabbooApi from 'services/GabbooApi';

export const SET_COUPLE_CHECKLIST = 'SET_COUPLE_CHECKLIST';

const getCoupleChecklist = (coupleId) => {
  return async (dispatch) => {
    const results = await gabbooApi.getCoupleChecklist(coupleId);
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
