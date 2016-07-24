/**
 * Created by psenger on 7/24/16.
 */

const initialState = {
  aReducer11Value : '',
  aReducer22Value : ''
};

export default function aReducer(state = initialState, action) {

  switch (action.type) {
    case '11':
      return Object.assign({}, state, { aReducer11Value : action.value } );
    case '22':
      return Object.assign({}, state, { aReducer22Value : action.value } );
    default:
      return state;
  }
}
