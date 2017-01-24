import React, { Component, PropTypes } from 'react';

import { Footer } from './common/index';

export default class AppRoot extends Component {

  static propTypes = {
    children: PropTypes.element,
    location: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    location: PropTypes.object,
  };

  getChildContext() {
    return {
      location: this.props.location,
    }
  }
  //likely put the nav in here too at the top
  render() {
    return (
      <section>
        {this.props.children}
        <Footer />
      </section>
    );
  }
}
