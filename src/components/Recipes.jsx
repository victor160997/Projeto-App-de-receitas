import React, { Component } from 'react';
import { connect } from 'react-redux';

class Recipes extends Component {
  constructor() {
    super();
    this.renderRecipes = this.renderRecipes.bind(this);
  }

  renderRecipes(data) {
    return (
      <section>
        {
          data.map((curr, index) => (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <img src={ curr.strMealThumb } alt="Recipe example" />
            </div>))
        }
      </section>
    );
  }

  render() {
    const { type } = this.props;
    return (
      <div>
        Hi
        {type === 'Bebidas'
          ? this.renderRecipes(DrinkData) : this.renderRecipes(foodData)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  foodData: state.foodData.data,
  drinkData: state.foodData.data,
});

export default connect(mapStateToProps)(Recipes);
