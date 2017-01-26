export const SOMETHING_REQUEST = 'SOMETHING_REQUEST';
export const SOMETHING_SUCCESS = 'SOMETHING_SUCCESS';
export const SOMETHING_FAILURE = 'SOMETHING_FAILURE';

import { getSomething } from '../sources/something'

export const fetchSomething = () => {
  return (dispatch) => dispatch({type: SOMETHING_SUCCESS, result: {} });
  /*return {
    request: 'careers',
    types: [SOMETHING_REQUEST, SOMETHING_SUCCESS, SOMETHING_FAILURE],
    promise: getSomething()
  };*/
};
