let serverStore = null;
try {
  if (window && window.serverStore) {
    serverStore = JSON.parse(window.serverStore);
  } else {
    serverStore = {};
  }
} catch (error) {
  serverStore = {};
}

const initialState = {};

const serverState = (state = initialState, action) => {
  return { ...state, ...serverStore.serverState };
};

export default serverState;
