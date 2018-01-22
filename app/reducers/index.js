import { combineReducers } from 'redux';
import something from './something';

export default combineReducers({
  app: state => state || {},
  something,
});
