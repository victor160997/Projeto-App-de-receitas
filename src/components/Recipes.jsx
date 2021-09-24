import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      if (data.length === 1) {
        return redirectDetailsFood(data[0].idMeal);
      }
    }
    return undefined;
  }

  renderRecipes(data, api, page) {
    this.redirectDetails(api, data);
    const limitImgs = 12;
    return (
      <section>
        {
          data.map((curr, index) => {
            if (index < limitImgs) {
              const ingredientsURL = 'https://www.thecocktaildb.com/images/ingredients/';
              const src = api !== 'explore-drinks'
                ? curr[`str${api}Thumb`]
                : `${ingredientsURL}${curr.strIngredient1.split(' ')
                  .join('%20')}-Small.png`;
              return (
                <div key={ index } data-testid={ `${index}-${page}-card` }>
                  <img
                    src={ src }
                    data-testid={ `${index}-card-img` }
                    width="200px"
                    alt="Recipe example"
                    loading="lazy"
                  />
                  <span data-testid={ `${index}-card-name` }>{curr[`str${api}`]}</span>
                </div>
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
    if (foodData === null || drinkData === null) {
      return global
        .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }

    return (
      <div>
        {type === 'Bebidas' && drinks.length
          ? this.renderRecipes(drinks, 'Drink', 'recipes')
          : '' }
        {type === 'Comidas' && data.length
          ? this.renderRecipes(data, 'Meal', 'recipes')
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

const mapStateToProps = ({ foodData, drinkData }) => ({
  foodData,
  drinkData,
});

export default connect(mapStateToProps)(Recipes);

Recipes.propTypes = {
  type: PropTypes.string.isRequired,
  drinkData: PropTypes.arrayOf(PropTypes.object).isRequired,
  foodData: PropTypes.arrayOf(PropTypes.object).isRequired,
  redirectDetailsDrink: PropTypes.func.isRequired,
  redirectDetailsFood: PropTypes.func.isRequired,
};
