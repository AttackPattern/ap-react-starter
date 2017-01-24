import { combineReducers } from 'redux'
import { SOMETHING_REQUEST, SOMETHING_SUCCESS, SOMETHING_FAILURE } from '../actions/something';

//define the shape of the store object
const initialState = {
  data: [],
  isLoading: false,
  error: false,
}

const something = (state = initialState, action) => {

  switch (action.type) {
    /**
    * notice we are using spread on the existing state, this is because you shouldn't
    * mutate the actual state object, so we return a shallow copy
    **/
    case SOMETHING_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      }
      break;
    case SOMETHING_SUCCESS:
      console.log('success', action);
      return {
        ...state,
        data: action.result.data,
        isLoading: false,
      }
      break;
    case SOMETHING_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: true,
        }
        break;
    default:
      return state;
      break;
  }
}

//if we add another reducer, move this into it's own index file in side reducers
const appReducer = combineReducers({
  something,
});

export default appReducer;
