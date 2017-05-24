const appRoutes = require('../../app/routes').default;
const express = require('express');
const React = require('react');
const renderToString = require('react-dom/server').renderToString;
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StaticRouter as Router } from 'react-router';
import { getSomething } from '../../app/sources/something';
import appReducer from '../../app/reducers/something';
import AppRoot from '../../app/components/AppRoot.jsx';
global.fetch = require('node-fetch');

var router;
module.exports = router = express.Router();

router.get('/*', (req, res) => {
  //put the boostrap data from your middleware boostrap object into your stores
  const content = (
    <Router context={{}} location={req.url}>
      <AppRoot />
    </Router>
  );
  const location = {
    routes: appRoutes,
    location: req.url,
  };
  switch(location.location){
    case "/":
      getSomething()
      .then((somethingResponse) => {
        return somethingResponse.json();
      })
      .then((somethingJson) => {
        const store = createStore(appReducer, { something: { data: somethingJson } });
        const hydratedContent = React.createElement(
          Provider,
          { store },
          content
        );
        renderResponse(res, hydratedContent, store.getState());
      })
      .catch((error) =>{
        console.log('Yo, this is wack bro, your endpoint is broke');
        const store = createStore(appReducer, {});
        const emptyStoreContent = React.createElement(
          Provider,
          { store },
          content
        );
        renderResponse(res, emptyStoreContent , store.getState());
      });
      break;
    default:
      renderResponse(res, content);
      break;
  }
});

const renderResponse = (res, content, store = {}) => {
  res.render('server', {
    markup: renderToString(content),
    stores: store,
  });
}
