import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchFoodApi } from '../redux/actions';

class FoodRecipes extends Component {
  render() {
    const { fetchFood } = this.props;
    return (
      <div>
        <Header titlePage="Comidas" fetchApi={ fetchFood } />
        Food Recipes
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
