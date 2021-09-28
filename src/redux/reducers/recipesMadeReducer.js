import actions from '../actions';

const INITIAL_STATE = {
  madeFoods: [],
  madeDrinks: [],
};

function recipesMadeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.RECIPES_MADE_FOOD:
    return { ...state, madeFoods: [...state.madeFoods, action.payload] };
  case actions.RECIPES_MADE_DRINK:
    return { ...state, madeDrinks: [...state.madeDrinks, action.payload] };
  default:
    return state;
  }
}

export default recipesMadeReducer;
