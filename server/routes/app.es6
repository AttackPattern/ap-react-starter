import { Router } from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import appReducer from '../../app/reducers';
import AppRoot from '../../app/components/AppRoot.jsx';
import { renderToString } from 'react-dom/server';

module.exports = Router().get('/*', (req, res) => {
  const store = createStore(appReducer, res.state);
  res.render('server', {
    markup: renderToString(
      <Provider store={store} >
        <Router context={{}} location={req.url}>
          <AppRoot />
        </Router>
      </Provider>),
    stores: store.getState(),
  });
});
