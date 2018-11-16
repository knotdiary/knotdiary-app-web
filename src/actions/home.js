import knotDiaryApi from 'services/KnotDiaryApi';

export const SET_COUPLE_BANNER_DATA = 'SET_COUPLE_BANNER_DATA';
export const SET_HOME_CHECKLIST_DATA = 'SET_HOME_CHECKLIST_DATA';
export const HOME_IS_INITIALIZED = 'IS_INITIALIZED';

const getCoupleInfo = () => {
  return async (dispatch) => {
    const result = await knotDiaryApi.getCoupleInfo();
    if (result.isSuccess) {
      dispatch({ type: SET_COUPLE_BANNER_DATA, payload: result.data });
    }
  };
};

const getHomeChecklist = (coupleId) => {
  return async (dispatch) => {
    const results = await knotDiaryApi.getHomeChecklist(coupleId);
    if (results) {
      dispatch({ type: SET_HOME_CHECKLIST_DATA, payload: results });
    }
  };
};

const setCoupleBannerData = (payload) => ({ type: SET_COUPLE_BANNER_DATA, payload });

const setHomeChecklist = (payload) => ({ type: SET_HOME_CHECKLIST_DATA, payload });

const setIsInitialized = (payload) => ({ type: HOME_IS_INITIALIZED, payload });

export {
  setCoupleBannerData,
  setHomeChecklist,
  setIsInitialized,
  getCoupleInfo,
  getHomeChecklist,
};
