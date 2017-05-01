import React, { Component } from 'react';
import { render } from 'react-dom';
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
* entry script is the starting point.  So we replace the server side rendered code
* from server.jsx under the div with id main with the now client side rendered
* site.  This enables react-router to take over and run as a SPA
* @AppContainer is for hot module replacement, and is stripped when hot isn't enabled
* @Provider is for our Redux stores
* @BrowserRouter is the client side react-router wrapper
**/
const preloadState = window.__PRELOADED_STATE__ || {};
const store = createStore(appReducer, preloadState, applyMiddleware(thunk, fetch));
const renderApp = (Component) => {
  render((
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
            <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>
  ), document.getElementById('main'));
}

renderApp(AppRoot);
if(module.hot) {
  module.hot.accept('app/components/AppRoot.jsx', () => {
    /**
    * in theory you should be able to just send in AppRoot again
    * but in practice the app won't actually re-ender unless you add
    * the require('..').default
    **/
    renderApp(require('app/components/AppRoot.jsx').default)
  });
}
