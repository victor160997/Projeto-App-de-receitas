import actions from '../actions';

const INITIAL_STATE = {
  data: [],
  loading: false,
  foodIngredients: [],
  foodArea: [],
};

function foodReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.REQUEST_FOOD_API:
    return { ...state, loading: true };
  case actions.SET_FOOD_DATA:
    return { ...state, loading: false, data: action.payload };
  case actions.SET_FOOD_AREA:
    return { ...state, loading: false, foodArea: action.payload };
  case actions.SET_FOOD_INGREDIENTS:
    return { ...state, loading: false, foodIngredients: action.payload };
  case actions.FAILED_REQUEST:
    return { ...state, loading: false, error: action.payload };
  case actions.FILTER_FOOD:
    return { ...state, loading: false, data: action.payload };
  default:
    return state;
  }
}

export default foodReducer;
