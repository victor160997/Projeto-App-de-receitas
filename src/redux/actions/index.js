import getFoodApi from '../../services';

const actions = {
  REQUEST_FOOD_API: 'REQUEST_FOOD_API',
  SET_FOOD_DATA: 'SET_FOOD_DATA',
  FAILED_REQUEST: 'FAILED_REQUEST',
};

export const requestApi = () => ({
  type: actions.REQUEST_FOOD_API,
});

export const requestFoodApi = (payload) => ({
  type: actions.SET_FOOD_DATA, payload,
});

export const failedRequest = (error) => ({
  type: actions.FAILED_REQUEST, payload: error,
});

export const fetchFoodApi = (payload1, payload2) => async (dispatch) => {
  dispatch(requestApi());
  try {
    const { meals } = await getFoodApi(payload1, payload2);
    dispatch(requestFoodApi(meals));
  } catch (error) {
    dispatch(failedRequest(error.message));
  }
};

export default actions;
