import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import { Switch, withRouter } from 'react-router';
import { hot } from 'react-hot-loader';

import { Footer } from './common/index';
import { Route } from 'react-router-dom';
import routes from '../routes';

@hot(module)
@withRouter
export default class AppRoot extends Component {

  RenderSubRoute(route, index) {
    return (
      <Route key={index} exact={route.exact} path={route.path} render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes}/>
      )}/>
    )
  }
  //likely put the nav in here too at the top
  render() {
    return [(
        <Switch key="root-content-switch">{routes.map(this.RenderSubRoute)}</Switch>
      ), (
        <Footer key="root-footer" />
    )];
  }
}
