import { combineReducers } from 'redux';
import foodReducer from './foodReducer';
import drinkReducer from './drinkReducer';
import recipesMadeReducer from './recipesMadeReducer';

const rootReducer = combineReducers({
  foodData: foodReducer,
  drinkData: drinkReducer,
  recipesMadeReducer,
});

export default rootReducer;
