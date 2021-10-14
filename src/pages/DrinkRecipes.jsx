import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoriesButton from '../components/CategoriesButton';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import { fetchDrinkApi } from '../redux/actions';

class DrinkRecipes extends Component {
  constructor(props) {
    super(props);
    this.redirectDetailsDrink = this.redirectDetailsDrink.bind(this);
  }

  componentDidMount() {
    const { fetchDrink, location: { state } } = this.props;
    const storageFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!storageFavorites) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    if (state) {
      fetchDrink('filter.php?i=', state);
    } else {
      fetchDrink('search.php?s=', '');
    }
  }

  redirectDetailsDrink(id) {
    const { history } = this.props;
    history.push(`bebidas/${id}`);
  }

  render() {
    const { fetchDrink } = this.props;
    const Bebidas = 'Bebidas';
    return (
      <div className="body-list-recipes">
        <Header titlePage={ Bebidas } fetchApi={ fetchDrink } />
        <CategoriesButton category="drinks" />
        <Recipes type={ Bebidas } redirectDetailsDrink={ this.redirectDetailsDrink } />
        <Footer />
      </div>
    );
  }
}

DrinkRecipes.propTypes = {
  fetchDrink: PropTypes.func.isRequired,
  history: PropTypes.string.isRequired,
  location: PropTypes.objectOf(PropTypes.node).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchDrink: (payload1, payload2) => dispatch(fetchDrinkApi(payload1, payload2)),
});

export default connect(null, mapDispatchToProps)(DrinkRecipes);
