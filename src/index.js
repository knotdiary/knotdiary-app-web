import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createBrowserHistory }  from 'history';
import { ConnectedRouter , connectRouter, routerMiddleware } from 'connected-react-router';
import { unregister } from './serviceWorker';

import App from './App';
import * as reducers from './reducers/index';

import './index.scss';

const history = createBrowserHistory();

const appReducers = combineReducers({
  ...reducers,
});

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  applyMiddleware(routerMiddleware(history)),
);

const store = createStore(connectRouter(history)(appReducers), enhancer);

const renderMethod = !!module.hot ? ReactDOM.render : ReactDOM.hydrate;
renderMethod(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
unregister();

export default store;
