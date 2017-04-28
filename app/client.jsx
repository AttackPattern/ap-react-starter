import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import fetch from './middleware/fetch';

import appReducer from './reducers/something'
import AppRoot from 'app/components/AppRoot.jsx';
require('./styles/main.scss');


/**
* so when the app is delivered to the client, the client.jsx (transpiled to client.js)
* entry script is the starting point.  So we replace the server side rendered code
* from server.jsx under the div with id main with the now client side rendered
* site.  This enables react-router to take over and run as a SPA
**/
const preloadState = window.__PRELOADED_STATE__ || {};
const store = createStore(appReducer, preloadState, applyMiddleware(thunk, fetch));
const App = (
  <Provider store={store}>
    <BrowserRouter>
      <AppRoot />
    </BrowserRouter>
  </Provider>
);
render(App, document.getElementById('main'));
