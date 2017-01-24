import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

/**
* use Link instead of <a> references for local routing
* ex: <Link className="btn some-other-class" to="/services">
**/


export default class Something extends Component {

  render() {
    return (
      <div>
        Hey, here is a bunch of content
      </div>
    )
  }
}
