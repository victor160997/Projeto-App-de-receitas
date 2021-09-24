import actions from '../actions';

const INITIAL_STATE = {
  data: {},
  drinkDetail: [],
  loading: false,
};

function drinkReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.REQUEST_DRINK_API:
    return { ...state, loading: true };
  case actions.SET_DRINK_DATA:
    return { ...state, loading: false, data: action.payload };
  case actions.SET_DRINK_DETAIL_DATA:
    return { ...state, loading: false, drinkDetail: action.payload };
  case actions.FAILED_REQUEST:
    return { ...state, loading: false, error: action.payload };
  default:
    return state;
  }
}

export default drinkReducer;
