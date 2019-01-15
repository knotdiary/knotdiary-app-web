import knotDiaryApi from 'services/KnotDiaryApi';

export const SET_COUPLE_INFO = 'SET_COUPLE_INFO';

const getCoupleInfo = (username) => {
  return async (dispatch) => {
    const result = await knotDiaryApi.getCoupleInfo(username);
    if (result.isSuccess) {
      dispatch({ type: SET_COUPLE_INFO, payload: result.data });
    }
  };
};

const setCoupleInfo = (payload) => ({ type: SET_COUPLE_INFO, payload });

export {
  setCoupleInfo,
  getCoupleInfo,
};
