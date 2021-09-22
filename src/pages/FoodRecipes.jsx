import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import { fetchFoodApi } from '../redux/actions';

class FoodRecipes extends Component {
  render() {
    const Comidas = 'Comidas';
    const { fetchFood } = this.props;
    return (
      <div>
        <Header titlePage={ Comidas } fetchApi={ fetchFood } />
        Food Recipes
        <Recipes type={ Comidas } />
        <Footer />
      </div>
    );
  }
}

FoodRecipes.propTypes = {
  fetchFood: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchFood: (payload1, payload2) => dispatch(fetchFoodApi(payload1, payload2)),
});

export default connect(null, mapDispatchToProps)(FoodRecipes);
