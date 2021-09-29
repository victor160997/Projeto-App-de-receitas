/* import React, { Component } from 'react';

export default class ReceipeInProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: '',
    };
  }

  componentDidMount() {
    const storageInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    this.setRecipe(storageInProgress);
  }

  setRecipe(recipe) {
    this.setState({ recipe });
  }

  render() {
    return (
      <div>
        receita em progresso.
      </div>
    );
  }
} */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { confereFavorite,
  adcFavorite, renderCategory, renderIgredients, removeFavorite }
  from '../components/FunctionsDetails';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getDrinksApi, getFoodApi } from '../services';

class ReceipeInProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: '',
      sharedLink: false,
      favorite: false,
    };

    this.shareRecipe = this.shareRecipe.bind(this);
  }

  componentDidMount() {
    const storageFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { match: { params: { id } } } = this.props;
    this.getRecipe(id);
    if (storageFavorites) {
      this.setFavorite(id);
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({}));
      this.setTeste();
    }
  }

  async getRecipe(id) {
    const { match: { path } } = this.props;
    if (path === '/bebidas/:id/in-progress') {
      const response2 = await getDrinksApi(`lookup.php?i=${id}`, '');
      return this.setState({ recipe: response2.drinks[0] });
    }
    const response = await getFoodApi(`lookup.php?i=${id}`, '');
    return this.setState({ recipe: response.meals[0] });
  }

  setTeste() {
    this.setState({ favorite: false });
  }

  setFavorite(id) {
    this.setState({ favorite: confereFavorite(id) });
  }

  shareRecipe() {
    document.getElementById('link-to-share-progress').select();
    document.execCommand('copy');
    this.setState({ sharedLink: true });
  }

  render() {
    const { recipe, sharedLink, favorite } = this.state;
    const { match: { path, params: { id } } /* location: { pathname } */ } = this.props;
    console.log(recipe);
    return (
      <div>
        { recipe && <img
          data-testid="recipe-photo"
          src={ recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb }
          alt={ recipe.strMeal ? recipe.strMeal : recipe.strDrink }
          width="300vw"
        /> }
        {/* <img
          data-testid="recipe-photo"
          src={ recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb }
          alt={ recipe.strMeal ? recipe.strMeal : recipe.strDrink }
          width="300vw"
        /> */}
        <h1 data-testid="recipe-title">
          { recipe.strMeal ? recipe.strMeal : recipe.strDrink }
        </h1>
        <div className="linkShare">
          <input
            type="url"
            id="link-to-share-progress"
            value={ window.location.href }
          />
        </div>
        <button
          type="button"
          onClick={ this.shareRecipe }
        >
          <img src={ shareIcon } alt="shareIcon" data-testid="share-btn" />
        </button>
        { sharedLink ? <p>Link copiado!</p> : '' }
        <button
          type="button"
          onClick={ () => {
            if (confereFavorite(id) === true) {
              removeFavorite(recipe);
              return this.setState({ favorite: false });
            }
            adcFavorite(recipe);
            return this.setState({ favorite: true });
          } }
        >
          <img
            src={ favorite ? blackHeartIcon : whiteHeartIcon }
            alt=""
            data-testid="favorite-btn"
          />
        </button>
        { renderCategory(path, recipe) }
        <div>
          <h2>Igredients</h2>
          <ul>
            { renderIgredients(recipe, 'progress') }
          </ul>
        </div>
        <div>
          <h2>Intructions</h2>
          <span data-testid="instructions">{recipe.strInstructions}</span>
        </div>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="button-iniciar"
          id="button-details-child"
        >
          Finalizar receita
        </button>
      </div>
    );
  }
}

export default ReceipeInProgress;

ReceipeInProgress.propTypes = {
  match: PropTypes.objectOf({
    params: PropTypes.objectOf(PropTypes.string),
    path: PropTypes.string,
  }).isRequired,
};
