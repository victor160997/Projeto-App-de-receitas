import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  adcMadeRecipesFood as madeFoodAction,
  adcMadeRecipesDrink as madeDrinkAction,
} from '../redux/actions';

import { getDrinksApi, getFoodApi } from '../services';
import './details.css';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      recomendation: [],
    };
    this.renderIgredients = this.renderIgredients.bind(this);
    this.fetchRecomendations = this.fetchRecomendations.bind(this);
    this.renderVideo = this.renderVideo.bind(this);
    this.renderCategory = this.renderCategory.bind(this);
    this.renderRecomendation = this.renderRecomendation.bind(this);
    this.clearButton = this.clearButton.bind(this);
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

  clearButton() {
    const { recipe } = this.state;
    const { adcMadeFood, adcMadeDrink } = this.props;
    if (recipe.idMeal) {
      adcMadeFood(recipe.idMeal);
      const storage = JSON.parse(localStorage.getItem('madeFood'));
      const array = [...storage, recipe.idMeal];
      localStorage.setItem('madeFood', JSON.stringify(array));
    } else {
      adcMadeDrink(recipe.idDrink);
      const storage = JSON.parse(localStorage.getItem('madeDrink'));
      const array = [...storage, recipe.idDrink];
      localStorage.setItem('madeDrink', JSON.stringify(array));
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
      <li
        data-testid={ `${index}-ingredient-name-and-measure` }
        key={ igr }
      >
        { igr }
        -
        { recipe[`strMeasure${index + 1}`] }
      </li>
    ));
  }

  renderVideo(path, recipe) {
    if (path.includes('/comidas')) {
      return (
        <div>
          <h2>Video</h2>
          <iframe
            data-testid="video"
            width="300"
            height="150"
            src={ recipe.strYoutube
              ? recipe.strYoutube.replace('watch?v=', 'embed/') : undefined }
            frameBorder="0"
            allow="accelerometer; autoplay;
             clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
      );
    }
    return undefined;
  }

  renderCategory(path, recipe) {
    if (path.includes('/comidas')) {
      return (
        <h2 data-testid="recipe-category">{recipe.strCategory}</h2>
      );
    }
    return (
      <div>
        <h2 data-testid="recipe-category">{recipe.strAlcoholic}</h2>
        <h2 data-testid="recipe-category">{recipe.strCategory}</h2>
      </div>
    );
  }

  renderRecomendation(recomendation, path) {
    const six = 6;
    return recomendation.map((rec, index) => {
      if (index < six) {
        return (
          <div data-testid={ `${index}-recomendation-card` } className="recomendation">
            <img
              src={ path.includes('/comidas') ? rec.strDrinkThumb
                : rec.strMealThumb }
              alt="alguma coisa"
            />
            <h2 data-testid={ `${index}-recomendation-title` }>
              { path.includes('/comidas') ? rec.strDrink
                : rec.strMeal }
            </h2>
          </div>
        );
      }
      return undefined;
    });
  }

  render() {
    const { match: { path }, location: { pathname } } = this.props;
    const { recipe, recomendation } = this.state;
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
        <button data-testid="share-btn" type="button">compartilhar</button>
        <button data-testid="favorite-btn" type="button">favoritar</button>
        { this.renderCategory(path, recipe) }
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
        { this.renderVideo(path, recipe) }
        <div className="details-recomendation">
          { recomendation.length > 0
            ? this.renderRecomendation(recomendation, path) : <span>...Loading</span>}
        </div>
        <Link to={ `${pathname}/in-progress` }>
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="button-iniciar"
            onClick={ this.clearButton }
          >
            Iniciar Receita
          </button>
        </Link>
      </div>
    );
  }
}

Details.propTypes = {
  adcMadeDrink: PropTypes.func.isRequired,
  adcMadeFood: PropTypes.func.isRequired,
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
