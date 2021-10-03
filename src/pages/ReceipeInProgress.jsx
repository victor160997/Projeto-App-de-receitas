import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { confereFavorite, checkIngredientsToButton, redirectToMadeRecipes,
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
      checkIngredients: '',
    };

    this.shareRecipe = this.shareRecipe.bind(this);
    this.handleIngredients = this.handleIngredients.bind(this);
  }

  componentDidMount() {
    const storageProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const storageFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { match: { params: { id } } } = this.props;
    this.getRecipe(id);
    if (storageProgress) {
      this.setCheks(storageProgress.value);
    }
    if (storageFavorites) {
      this.setFavorite(id);
    }
    if (!storageFavorites) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      this.setTeste();
    }
  }

  componentDidUpdate(s, p) {
    const { recipe, checkIngredients } = this.state;
    const tam = document.querySelectorAll('.ingredient-step-list');
    const storageProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let value = {};
    if (recipe !== '' && checkIngredients === '' && !storageProgress) {
      tam.forEach((t, i) => {
        value = {
          ...value,
          [`value${i}`]: false,
        };
      });
      this.setCheks(value);
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        recipe,
        value,
      }));
    }
    if (p.checkIngredients !== checkIngredients) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        recipe,
        value: checkIngredients,
      }));
    }
  }

  handleIngredients(index, target) {
    this.setState((prevState) => ({
      checkIngredients: {
        ...prevState.checkIngredients,
        [`value${index}`]: target.checked,
      },
    }));
  }

  setCheks(value) {
    this.setState({
      checkIngredients: value,
    });
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
    const { recipe, sharedLink, favorite, checkIngredients } = this.state;
    const { match: { path, params: { id } }, history } = this.props;
    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb }
          alt={ recipe.strMeal ? recipe.strMeal : recipe.strDrink }
          width="300vw"
        />
        <h1 data-testid="recipe-title">
          { recipe.strMeal ? recipe.strMeal : recipe.strDrink }
        </h1>
        <div className="linkShare">
          <input
            type="url"
            id="link-to-share-progress"
            value={ window.location.href.replace('/in-progress', '') }
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
            { renderIgredients(recipe, 'progress', checkIngredients,
              this.handleIngredients) }
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
          disabled={ checkIngredientsToButton(checkIngredients) }
          onClick={ () => redirectToMadeRecipes(history) }
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
  history: PropTypes.objectOf(PropTypes.string).isRequired,
};
