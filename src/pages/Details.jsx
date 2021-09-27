import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDrinksApi, getFoodApi } from '../services';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      recomendation: [],
    };
    this.renderIgredients = this.renderIgredients.bind(this);
    this.fetchRecomendations = this.fetchRecomendations.bind(this);
  }

  componentDidMount() {
    this.fetchRecipeById();
    this.fetchRecomendations();
  }

  async fetchRecomendations() {
    const { match: { path } } = this.props;
    if (path.includes('/comidas')) {
      const response = await getFoodApi('search.php?s=', '');
      this.setState({
        recomendation: response.meals,
      });
    } else {
      const response = await getDrinksApi('search.php?s=', '');
      this.setState({
        recomendation: response.drinks,
      });
    }
  }

  async fetchRecipeById() {
    const { match: { params: { id }, path } } = this.props;
    if (path.includes('/comidas')) {
      const response = await getFoodApi(`lookup.php?i=${id}`, '');
      this.setState({
        recipe: response.meals[0],
      });
    } else {
      const response = await getDrinksApi(`lookup.php?i=${id}`, '');
      this.setState({
        recipe: response.drinks[0],
      });
    }
  }

  renderIgredients(recipe) {
    const array = Object.keys(recipe);
    const arrayVazio = [];
    array.map((key) => {
      if (key.includes('strIngredient') && recipe[key] !== null && recipe[key] !== '') {
        arrayVazio.push(recipe[key]);
        return arrayVazio;
      }
      return undefined;
    });
    return arrayVazio.map((igr, index) => (
      <li data-testid={ `${index}-ingredient-name-and-measure` } key={ igr }>{ igr }</li>
    ));
  }

  render() {
    const { match: { path } } = this.props;
    const { recipe, recomendation } = this.state;
    console.log(recomendation);
    return (
      <div>
        <img
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
            {this.renderIgredients(recipe)}
          </ul>
        </div>
        <div>
          <h2>Intructions</h2>
          <span data-testid="instructions">{recipe.strInstructions}</span>
        </div>
        <div>
          <h2>Video</h2>
          <iframe
            data-testid="video"
            width="300"
            height="150"
            src={ recipe.strYoutube }
            frameBorder="0"
            allow="accelerometer; autoplay;
             clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
        { recomendation.length > 0 ? (
          <div>
            <div data-testid="0-recomendation-card">
              <img
                src={ path.includes('/comidas') ? recomendation[0].strMealThumb
                  : recomendation[0].strDrinkThumb }
                alt="alguma coisa"
              />
              <h2>
                { path.includes('/comidas') ? recomendation[0].strMeal
                  : recomendation[0].strDrink }
              </h2>
            </div>
            <div data-testid="1-recomendation-card">
              <img
                src={ path.includes('/comidas') ? recomendation[1].strMealThumb
                  : recomendation[1].strDrinkThumb }
                alt="alguma coisa"
              />
              <h2>
                { path.includes('/comidas') ? recomendation[1].strMeal
                  : recomendation[1].strDrink }
              </h2>
            </div>
          </div>) : <span>...Loading</span>}
        <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>

      </div>
    );
  }
}

Details.propTypes = {
  match: PropTypes.objectOf({
    params: PropTypes.objectOf(PropTypes.string),
    path: PropTypes.string,
  }).isRequired,
};
const mapStateToProps = (state) => ({
  foodData: state.foodData.data,
  drinkData: state.drinkData.data,
});

export default connect(mapStateToProps)(Details);
