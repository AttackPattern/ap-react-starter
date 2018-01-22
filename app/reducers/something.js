import * as Actions from '../actions/something';

//define the shape of the store object
const initialState = {
  data: [],
  isLoading: false,
  error: false,
}

export default (state = initialState, action) => {

  switch (action.type) {
    /**
    * notice we are using spread on the existing state, this is because you shouldn't
    * mutate the actual state object, so we return a shallow copy
    **/
    case Actions.SOMETHING_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      }
      break;
    case Actions.SOMETHING_SUCCESS:
      console.log('success', action);
      return {
        ...state,
        data: action.result.data,
        isLoading: false,
      }
      break;
    case Actions.SOMETHING_FAILURE:
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
