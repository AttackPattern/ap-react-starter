import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchSomething } from "../../actions/something"

/**
* use Link instead of <a> references for local routing
* ex: <Link className="btn some-other-class" to="/services">
**/
@connect(
  state => ({
    data: state.something.data,
  }),
  dispatch => bindActionCreators({
    fetchSomething }, dispatch)
)
export default class Something extends Component {

  render() {
    return (
      <div>
        Hey, here is a bunch of content
      </div>
    )
  }
}
