import { combineReducers } from 'redux';
import selectReducer from './selectReducer.js';

const allReducers= combineReducers({
  select: selectReducer,
});

export default allReducers;