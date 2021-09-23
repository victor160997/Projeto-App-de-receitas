import { combineReducers } from 'redux';
import foodReducer from './foodReducer';
import drinkReducer from './drinkReducer';

const rootReducer = combineReducers({
  foodData: foodReducer,
  drinkData: drinkReducer,
});

export default rootReducer;
