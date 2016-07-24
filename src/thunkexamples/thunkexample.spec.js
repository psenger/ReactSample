/**
 * Created by psenger on 7/24/16.
 */
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer/index";
import API from "./api/API";
import * as actions from "./action/aActions";

const api = new API();

// Note: this API requires redux@>=3.1.0
const store = createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument( { api: api } ))
);


store.dispatch( actions.AA('something')     );
store.dispatch( actions.BB('something')     );
store.dispatch( actions.ONEONE('something') );
store.dispatch( actions.TWOTWO('something') );

console.log( store.getState() );

/** Can pass a function because of thunk **/
store.dispatch(function (dispatch) {
  console.log('>', arguments );
  dispatch(actions.AA('1'));
  dispatch(actions.BB('2'));
  dispatch(actions.ONEONE('3'));
  setTimeout(() => {
    dispatch(actions.TWOTWO('4'))
  }, 1000)
});

/**
 *
 *   If Redux Thunk middleware is enabled, any time you attempt to dispatch a
 *   function instead of an action object, the middleware will call that function
 *   with dispatch method itself as the first argument.
 *
 ***/

export function showNotificationWithTimeout(text) {

  return function (dispatch) {

    console.log('>', arguments );
    
    setTimeout(() => {
      dispatch(actions.AA(text));
      dispatch(actions.BB(text));
    }, 1000);
    return actions.goRedit().then(
      sauce => dispatch(actions.ONEONE('good')),
      error => dispatch(actions.TWOTWO('bad'))
    );
  }

}

store.dispatch( showNotificationWithTimeout('cool beans') ).then(()=>{ console.log( store.getState() ); });



//
// // Even without middleware, you can dispatch an action:
// store.dispatch(withdrawMoney(100));
//
// // But what do you do when you need to start an asynchronous action,
// // such as an API call, or a router transition?
//
// // Meet thunks.
// // A thunk is a function that returns a function.
// // This is a thunk.
//
// function makeASandwichWithSecretSauce(forPerson) {
//
//   // Invert control!
//   // Return a function that accepts `dispatch` so we can dispatch later.
//   // Thunk middleware knows how to turn thunk async actions into actions.
//
//   return function (dispatch) {
//     return fetchSecretSauce().then(
//       sauce => dispatch(makeASandwich(forPerson, sauce)),
//       error => dispatch(apologize('The Sandwich Shop', forPerson, error))
//     );
//   };
// }
//
// // Thunk middleware lets me dispatch thunk async actions
// // as if they were actions!
//
// store.dispatch(
//   makeASandwichWithSecretSauce('Me')
// );
//
// // It even takes care to return the thunk’s return value
// // from the dispatch, so I can chain Promises as long as I return them.
//
// store.dispatch(
//   makeASandwichWithSecretSauce('My wife')
// ).then(() => {
//   console.log('Done!');
// });
//
// // In fact I can write action creators that dispatch
// // actions and async actions from other action creators,
// // and I can build my control flow with Promises.
//
// function makeSandwichesForEverybody() {
//   return function (dispatch, getState, api) {
//     if (!getState().sandwiches.isShopOpen) {
//
//       // You don’t have to return Promises, but it’s a handy convention
//       // so the caller can always call .then() on async dispatch result.
//
//       return Promise.resolve();
//     }
//
//     // We can dispatch both plain object actions and other thunks,
//     // which lets us compose the asynchronous actions in a single flow.
//
//     return dispatch(
//       makeASandwichWithSecretSauce('My Grandma')
//     ).then(() =>
//       Promise.all([
//         dispatch(makeASandwichWithSecretSauce('Me')),
//         dispatch(makeASandwichWithSecretSauce('My wife'))
//       ])
//     ).then(() =>
//       dispatch(makeASandwichWithSecretSauce('Our kids'))
//     ).then(() =>
//       dispatch(getState().myMoney > 42 ?
//         withdrawMoney(42) :
//         apologize('Me', 'The Sandwich Shop')
//       )
//     );
//   };
// }
//
// // This is very useful for server side rendering, because I can wait
// // until data is available, then synchronously render the app.
//
// store.dispatch(
//   makeSandwichesForEverybody()
// ).then(() =>
//   response.send(ReactDOMServer.renderToString(<MyApp store={store} />))
// );
//
// // I can also dispatch a thunk async action from a component
// // any time its props change to load the missing data.
//
// import { connect } from 'react-redux';
// import { Component } from 'react';
//
// class SandwichShop extends Component {
//   componentDidMount() {
//     this.props.dispatch(
//       makeASandwichWithSecretSauce(this.props.forPerson)
//     );
//   }
//
//   componentWillReceiveProps(nextProps) {
//     if (nextProps.forPerson !== this.props.forPerson) {
//       this.props.dispatch(
//         makeASandwichWithSecretSauce(nextProps.forPerson)
//       );
//     }
//   }
//
//   render() {
//     return <p>{this.props.sandwiches.join('mustard')}</p>
//   }
// }
//
// export default connect(
//   state => ({
//     sandwiches: state.sandwiches
//   })
// )(SandwichShop);
