import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Recipes extends Component {
  constructor() {
    super();
    this.renderFoodRecipes = this.renderFoodRecipes.bind(this);
    this.renderDrinkRecipes = this.renderDrinkRecipes.bind(this);
  }

  renderFoodRecipes(data) {
    const limitImgs = 12;
    const { redirectDetailsFood } = this.props;
    if (data.length === 1) {
      return redirectDetailsFood(data[0].idMeal);
    }
    return (
      <section>
        {
          data.map((curr, index) => {
            if (index < limitImgs) {
              return (
                <div key={ index } data-testid={ `${index}-recipe-card` }>
                  <img
                    src={ curr.strMealThumb }
                    data-testid={ `${index}-card-img` }
                    width="200px"
                    alt="Recipe example"
                  />
                  <span data-testid={ `${index}-card-name` }>{curr.strMeal}</span>
                </div>
              );
            }
            return undefined;
          })
        }
      </section>
    );
  }

  renderDrinkRecipes(data) {
    const { redirectDetailsDrink } = this.props;
    if (data.length === 1) {
      return redirectDetailsDrink(data[0].idDrink);
    }
    const limitImgs = 12;
    return (
      <section>
        {
          data.map((curr, index) => {
            if (index < limitImgs) {
              return (
                <div key={ index } data-testid={ `${index}-recipe-card` }>
                  <img
                    src={ curr.strDrinkThumb }
                    data-testid={ `${index}-card-img` }
                    width="200px"
                    alt="Recipe example"
                  />
                  <span data-testid={ `${index}-card-name` }>{curr.strDrink}</span>
                </div>
              );
            }
            return undefined;
          })
        }
      </section>
    );
  }

  render() {
    const { type, drinkData, foodData } = this.props;

    return (
      <div>
        {type === 'Bebidas' && drinkData.length
          ? this.renderDrinkRecipes(drinkData) : ''}
        {type === 'Comidas' && foodData.length
          ? this.renderFoodRecipes(foodData) : ''}
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
  redirectDetailsFood: PropTypes.func.isRequired,
  redirectDetailsDrink: PropTypes.func.isRequired,
};
