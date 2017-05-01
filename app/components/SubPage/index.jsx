import React, { Component } from 'react';
import  PropTypes from 'prop-types';
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
export default class SubPage extends Component {

  render() {
    return (
      <div>
        Welcome to a child page
      </div>
    )
  }
}
