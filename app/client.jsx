import React, { Component } from 'react';
import { hydrate } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import fetch from './middleware/fetch';

import appReducer from './reducers/something'
import AppRoot from 'app/components/AppRoot.jsx';
require('./styles/main.scss');


/**
* so when the app is delivered to the client, the client.jsx (transpiled to client.js)
* entry script is the starting point.  So we utilize the SSR code and compare it to the client
* in which case unless we are in development, they are the same and so there is minimal code change
* thanks to react 16's hydrate method.  All code under #main in server.jsx is the client rendered
* code (below).react-router now starts up runs all navigation treating the site as a SPA
* @Provider is for our Redux stores
* @BrowserRouter is the client side react-router wrapper
**/
const preloadState = window.__PRELOADED_STATE__ || {};
const store = createStore(appReducer, preloadState, applyMiddleware(thunk, fetch));
const renderApp = (Component) => {
  hydrate((
      <Provider store={store}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
  ), document.getElementById('main'));
};

renderApp(AppRoot);
