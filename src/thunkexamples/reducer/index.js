/**
 * Created by psenger on 7/24/16.
 */
import {combineReducers} from 'redux';
import aReducer from './aReducer';
import bReducer from './bReducer';

const rootReducer = combineReducers({
  aReducer,
  bReducer
});

export default rootReducer;
