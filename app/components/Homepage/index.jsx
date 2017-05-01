import React, { Component } from 'react';
import  PropTypes from 'prop-types';

export default class Homepage extends Component {

  static propTypes = {
    match: PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id="homepage">
        Welcome to the homepage

      </section>
    )
  }
}
