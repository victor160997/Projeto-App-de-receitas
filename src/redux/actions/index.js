import { getFoodApi, getDrinksApi } from '../../services';

const actions = {
  REQUEST_FOOD_API: 'REQUEST_FOOD_API',
  REQUEST_DRINK_API: 'REQUEST_DRINK_API',
  SET_DRINK_DATA: 'SET_DRINK_DATA',
  SET_FOOD_DATA: 'SET_FOOD_DATA',
  FAILED_REQUEST: 'FAILED_REQUEST',
  FILTER_FOOD: 'FILTER_FOOD',
  FILTER_DRINK: 'FILTER_DRINK',
  RECIPES_MADE_FOOD: 'RECIPES_MADE_FOOD',
  RECIPES_MADE_DRINK: 'RECIPES_MADE_DRINK',
};

export const adcMadeRecipesFood = (payload) => ({
  type: actions.RECIPES_MADE_FOOD, payload,
});

export const adcMadeRecipesDrink = (payload) => ({
  type: actions.RECIPES_MADE_DRINK, payload,
});

export const filterDrink = (payload) => ({
  type: actions.FILTER_DRINK, payload,
});

export const filterFood = (payload) => ({
  type: actions.FILTER_FOOD, payload,
});

export const requestApiFood = () => ({
  type: actions.REQUEST_FOOD_API,
});

export const requestApiDrink = () => ({
  type: actions.REQUEST_DRINK_API,
});

export const requestFoodApi = (payload) => ({
  type: actions.SET_FOOD_DATA, payload,
});

export const requestDrinkApi = (payload) => ({
  type: actions.SET_DRINK_DATA, payload,
});

export const failedRequest = (error) => ({
  type: actions.FAILED_REQUEST, payload: error,
});

export const fetchFoodApi = (payload1, payload2) => async (dispatch) => {
  dispatch(requestApiFood());
  try {
    const { meals } = await getFoodApi(payload1, payload2);
    dispatch(requestFoodApi(meals));
  } catch (error) {
    dispatch(failedRequest(error.message));
  }
};
export const fetchDrinkApi = (payload1, payload2) => async (dispatch) => {
  dispatch(requestApiDrink());
  try {
    const { drinks } = await getDrinksApi(payload1, payload2);
    dispatch(requestDrinkApi(drinks));
  } catch (error) {
    dispatch(failedRequest(error.message));
  }
};

export default actions;
