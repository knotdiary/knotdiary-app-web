import knotDiaryApi from 'services/KnotDiaryApi';

export const SET_COUPLE_BANNER_DATA = 'SET_COUPLE_BANNER_DATA';

const getCoupleInfo = () => {
  return async (dispatch) => {
    const result = await knotDiaryApi.getCoupleInfo();
    if (result.isSuccess) {
      dispatch({ type: SET_COUPLE_BANNER_DATA, payload: result.data });
    }
  };
};

const setCoupleBannerData = (payload) => ({ type: SET_COUPLE_BANNER_DATA, payload });

export {
  setCoupleBannerData,
  getCoupleInfo,
};
