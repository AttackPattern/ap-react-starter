import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import { Footer } from './common/index';
import { Route } from 'react-router-dom';
import routes from '../routes';

export default class AppRoot extends Component {

  static propTypes = {
    location: PropTypes.object,
  };

  static childContextTypes = {
    location: PropTypes.object,
  };

  getChildContext() {
    return {
      location: this.props.location,
    }
  }
  RenderSubRoute(route, index) {
    return (
      <Route key={index} path={route.path} render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes}/>
      )}/>
    )
  }
  //likely put the nav in here too at the top
  render() {
    return (
      <div>
      {routes.map(this.RenderSubRoute)}
        <Footer />
      </div>
    );
  }
}
