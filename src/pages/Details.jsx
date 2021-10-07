import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  adcMadeRecipesFood as madeFoodAction,
  adcMadeRecipesDrink as madeDrinkAction,
} from '../redux/actions';
import { renderButton } from '../components/RenderButtonDetails';

import { getDrinksApi, getFoodApi } from '../services';
import { renderRecomendation, confereFavorite,
  adcFavorite, renderCategory, renderVideo, renderIgredients, removeFavorite }
  from '../components/FunctionsDetails';
import './details.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      recomendation: [],
      sharedLink: false,
      favorite: false,
    };
    this.fetchRecomendations = this.fetchRecomendations.bind(this);
    this.shareRecipe = this.shareRecipe.bind(this);
  }

  componentDidMount() {
    this.fetchRecipeById();
    this.fetchRecomendations();
    const storageDrink = JSON.parse(localStorage.getItem('madeDrink'));
    const storageFood = JSON.parse(localStorage.getItem('madeFood'));
    if (!storageDrink) {
      localStorage.setItem('madeDrink', JSON.stringify([]));
    }
    if (!storageFood) {
      localStorage.setItem('madeFood', JSON.stringify([]));
    }
    const storageFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!storageFavorites) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const storageInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!storageInProgress) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({}));
    }
    this.setFavorite();
  }

  setFavorite() {
    const { match: { params: { id } } } = this.props;
    this.setState({ favorite: confereFavorite(id) });
  }

  async fetchRecomendations() {
    const { match: { path } } = this.props;
    if (path.includes('/comidas')) {
      const response = await getDrinksApi('search.php?s=', '');
      this.setState({
        recomendation: response.drinks,
      });
    } else {
      const response = await getFoodApi('search.php?s=', '');
      this.setState({
        recomendation: response.meals,
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

  shareRecipe() {
    document.getElementById('link-to-share').select();
    document.execCommand('copy');
    this.setState({ sharedLink: true });
  }

  render() {
    const { match: { path, params: { id } }, location: { pathname } } = this.props;
    const { recipe, recomendation, sharedLink, favorite } = this.state;
    return (
      <div className="body-details">
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
            id="link-to-share"
            value={ window.location.href }
          />
        </div>
        <button
          type="button"
          onClick={ this.shareRecipe }
        >
          <img src={ shareIcon } alt="shareIcon" data-testid="share-btn" />
        </button>
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
        { sharedLink ? <p>Link copiado!</p> : '' }
        { renderCategory(path, recipe) }
        <div>
          <h2>Igredients</h2>
          <ul>
            { renderIgredients(recipe) }
          </ul>
        </div>
        <div>
          <h2>Intructions</h2>
          <span data-testid="instructions">{recipe.strInstructions}</span>
        </div>
        { renderVideo(path, recipe) }
        <div className="details-recomendation">
          { recomendation.length > 0
            ? renderRecomendation(recomendation, path) : <span>...Loading</span>}
        </div>
        <div id="button-details">
          <div id="button-details-child">
            <Link to={ `${pathname}/in-progress` }>
              { renderButton(recipe) }
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Details.propTypes = {
  match: PropTypes.objectOf({
    params: PropTypes.objectOf(PropTypes.string),
    path: PropTypes.string,
  }).isRequired,
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};
const mapStateToProps = (state) => ({
  foodData: state.foodData.data,
  drinkData: state.drinkData.data,
});

const mapDispatchToProps = (dispatch) => ({
  adcMadeFood: (payload) => dispatch(madeFoodAction(payload)),
  adcMadeDrink: (payload) => dispatch(madeDrinkAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
