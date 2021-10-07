import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import HeaderExplore from '../components/HeaderExplore';
import { fetchDrinkApi } from '../redux/actions';
import Recipes from '../components/Recipes';

class ExploreDrinkIngredientes extends Component {
  componentDidMount() {
    const { fetchDrink } = this.props;
    fetchDrink('list.php?i=', 'list');
  }

  render() {
    return (
      <div>
        <HeaderExplore titlePage="Explorar Ingredientes" explore />
        <Recipes type="explore-drinks" />
        <Footer />
      </div>
    );
  }
}

ExploreDrinkIngredientes.propTypes = {
  fetchDrink: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchDrink: (payload1, payload2) => dispatch(fetchDrinkApi(payload1, payload2)),
});

export default connect(null, mapDispatchToProps)(ExploreDrinkIngredientes);
