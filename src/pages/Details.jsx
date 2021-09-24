import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchDrinkApi as fetchDrinkApiAction,
  fetchFoodApi as fetchFoodApiAction,
} from '../redux/actions';

class Details extends Component {
  componentDidMount() {
    const {
      fetchDrinkApi,
      fetchFoodApi,
      match: { params: { id }, path } } = this.props;
    if (path.includes('/comidas')) {
      fetchFoodApi('lookup.php?i=', id);
    } else {
      fetchDrinkApi('lookup.php?i=', id);
    }
  }

  render() {
    const { match: { path }, foodData } = this.props;
    console.log(foodData);
    return (
      <div>
        x
        {/* <img
          data-testid="recipe-photo"
          src={ recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb }
          alt={ recipe.strMeal ? recipe.strMeal : recipe.strDrink }
        />
        <h1 data-testid="recipe-title">
          { recipe.strMeal ? recipe.strMeal : recipe.strDrink }
        </h1>
        <button data-testid="share-btn" type="button">compartilhar</button>
        <button data-testid="favorite-btn" type="button">favoritar</button>
        <h2 data-testid="recipe-category">{recipe.trCategory}</h2>
        <div>
          <h2>Igredients</h2>
          <ul>
            <li>a</li>
          </ul>
        </div> */}
      </div>
    );
  }
}

Details.propTypes = {
  match: PropTypes.objectOf({
    params: PropTypes.objectOf(PropTypes.string),
    path: PropTypes.string,
  }).isRequired,
  fetchDrinkApi: PropTypes.func.isRequired,
  fetchFoodApi: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchDrinkApi: (p1, p2) => dispatch(fetchDrinkApiAction(p1, p2)),
  fetchFoodApi: (p1, p2) => dispatch(fetchFoodApiAction(p1, p2)),
});

const mapStateToProps = ({ foodData, drinkData }) => ({
  foodData: foodData.foodDetail[0],
  drinkData: drinkData.drinkDetail[0],
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);

// async fetchRecipeById() {
//   const { match: { params: { id }, path } } = this.props;
//   // caso esteja sendo renderizada em /comidas/id
//   if (path.includes('/comidas')) {
//     const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
//     fetch(URL)
//       .then((res) => res.json())
//       .then((json) => this.setState({
//         recipe: { ...json.meals[0],
//         },
//       }));
//   }
//   // caso esteja sendo renderizada em /bebidas/id
//   const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
//   fetch(URL)
//     .then((res) => res.json())
//     .then((json) => this.setState({
//       recipe: { ...json.drinks[0] },
//     }));
// }
