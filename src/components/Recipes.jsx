import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Recipes extends Component {
  constructor() {
    super();
    this.renderRecipes = this.renderRecipes.bind(this);
    this.redirectDetails = this.redirectDetails.bind(this);
  }

  redirectDetails(type, data) {
  // tentar props dinamica
    if (type === 'Drink') {
      const { redirectDetailsDrink } = this.props;
      if (data.length === 1) {
        return redirectDetailsDrink(data[0].idDrink);
      }
    }
    if (type === 'Meal') {
      const { redirectDetailsFood } = this.props;
      if (data.length === 1 && data[0].idMeal !== '52968') {
        return redirectDetailsFood(data[0].idMeal);
      }
    }
    return undefined;
  }

  renderRecipes(data, api) {
    this.redirectDetails(api, data);
    const { type } = this.props;
    const limitImgs = 12;
    return (
      <section>
        {
          data.map((curr, index) => {
            /* to={`/%{type.toLowerCase()}/${api}`} */
            if (index < limitImgs) {
              const ingredientsURL = 'https://www.thecocktaildb.com/images/ingredients/';
              const src = api !== 'explore-drinks'
                ? curr[`str${api}Thumb`]
                : `${ingredientsURL}${curr.strIngredient1.split(' ')
                  .join('%20')}-Small.png`;
              return (
                <Link to={ `/${type.toLowerCase()}/${curr[`id${api}`]}` }>
                  <div key={ index } data-testid={ `${index}-${page}-card` }>
                    <img
                      src={ src }
                      data-testid={ `${index}-card-img` }
                      width="200px"
                      alt="Recipe example"
                    />
                    <span data-testid={ `${index}-card-name` }>{curr[`str${api}`]}</span>
                  </div>
                </Link>
              );
            }
            return null;
          })
        }
      </section>
    );
  }

  render() {
    const { type, drinkData, foodData } = this.props;
    const { data, categoriesData } = foodData;
    const { data: drinks } = drinkData;
    if (data === null || drinks === null) {
      return global
        .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }

    return (
      <div>
        {type === 'Bebidas' && drinks.length
          ? this.renderRecipes(drinks, 'Drink', 'recipe')
          : '' }
        {type === 'Comidas' && data.length
          ? this.renderRecipes(data, 'Meal', 'recipe')
          : '' }
        {type === 'explore-drinks' && drinks.length
          ? this.renderRecipes(drinks, type, 'ingredient')
          : '' }
        {type === 'explore-ingrediente' && categoriesData.length
          ? this.renderRecipes(categoriesData, 'Category', 'ingredient')
          : '' }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  foodData: state.foodData.data,
  drinkData: state.drinkData.data,
});

export default connect(mapStateToProps)(Recipes);

Recipes.propTypes = {
  type: PropTypes.string.isRequired,
  drinkData: PropTypes.arrayOf(PropTypes.object).isRequired,
  foodData: PropTypes.arrayOf(PropTypes.object).isRequired,
  redirectDetailsDrink: PropTypes.func.isRequired,
  redirectDetailsFood: PropTypes.func.isRequired,
};
