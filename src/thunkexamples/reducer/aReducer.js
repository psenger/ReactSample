/**
 * Created by psenger on 7/24/16.
 */

const initialState = {
  aReducerAAValue : '',
  aReducerBBValue : ''
};

export default function aReducer(state = initialState, action) {

  // console.log ('>>>>>',arguments );
  switch (action.type) {
    case 'AA':
      return Object.assign({}, state, { aReducerAAValue : action.value } );
    case 'BB':
      return Object.assign({}, state, { aReducerBBValue : action.value } );
    default:
      return state;
  }
}
