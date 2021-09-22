import { combineReducers } from 'redux';
import foodReducer from './foodReducer';

const rootReducer = combineReducers({
  foodData: foodReducer,
});

export default rootReducer;
