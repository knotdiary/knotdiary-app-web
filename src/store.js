import { createStore, combineReducers } from 'redux';

export default function configureStore(initialState = {}) {
  const serverState = (state = initialState, action) => state;

  const appReducers = combineReducers({
    serverState,
  });

  const store = createStore(
    appReducers,
  );

  store.asyncReducers = {};

  return store;
}
