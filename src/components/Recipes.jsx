import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Recipes extends Component {
  constructor() {
    super();
    this.renderRecipes = this.renderRecipes.bind(this);
    this.redirectDetails = this.redirectDetails.bind(this);
  }

  /* const { redirectDetailsFood } = this.props;
  if (data.length === 1) {
    return redirectDetailsFood(data[0].idMeal);
  }

   const { redirectDetailsDrink } = this.props;
    if (data.length === 1) {
      return redirectDetailsDrink(data[0].idDrink);
    }
  */

  redirectDetails(type, data) {
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

  renderRecipes(data, api) {
    this.redirectDetails(api, data);
    const limitImgs = 12;
    return (
      <section>
        {
          data.map((curr, index) => {
            if (index < limitImgs) {
              return (
                <div key={ index } data-testid={ `${index}-recipe-card` }>
                  <img
                    src={ curr[`str${api}Thumb`] }
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
    if (foodData === null || drinkData === null) {
      return global
        .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }

    return (
      <div>
        {type === 'Bebidas' && drinkData.length
          ? this.renderRecipes(drinkData, 'Drink')
          : '' }
        {type === 'Comidas' && foodData.length
          ? this.renderRecipes(foodData, 'Meal')
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
