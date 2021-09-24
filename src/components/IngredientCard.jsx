import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class IngredientCard extends Component {
  constructor() {
    super();
    this.renderRecipes = this.renderRecipes.bind(this);
    this.redirectDetails = this.redirectDetails.bind(this);
  }

  redirectDetails(type, data) {
    if (type === 'Drink') {
      const { foodData } = this.props;
      if (data.length === 1) {
        return redirectDetailsDrink(data[0].idDrink);
      }
    }
    if (type === 'Meal') {
      const { foodData } = this.props;
      if (data.length === 1) {
        return redirectDetailsFood(data[0].idMeal);
      }
    }
    return undefined;
  }

  renderIngredients(data, api) {
    this.redirectDetails(api, data);
    const limitImgs = 12;
    return (
      <section>
        {
          data.map((curr, index) => {
            if (index < limitImgs) {
              return (
                <div key={ index } data-testid={ `${index}-ingredient-card` }>
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
    const { foodData } = this.props;
    if (foodData === null) {
      return global
        .alert('Sinto muito, não encontramos nenhum ingrediente para esses filtros.');
    }

    return (
      <div>
        { this.renderIngredients(foodData, 'Meal') }
      </div>
    );
  }
}

IngredientCard.propTypes = {
  foodData: PropTypes.arrayOf(PropTypes.object).isRequired,
  redirectDetailsDrink: PropTypes.func.isRequired,
  redirectDetailsFood: PropTypes.func.isRequired,
};
