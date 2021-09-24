import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import HeaderExplore from '../components/HeaderExplore';
import { fetchFoodApi } from '../redux/actions';
import Recipes from '../components/Recipes';

class ExploreFoodIngredientes extends Component {
  componentDidMount() {
    const { fetchFood } = this.props;
    fetchFood('categories.php', '');
  }

  render() {
    return (
      <div>
        <HeaderExplore titlePage="Explorar Ingredientes" />
        <Recipes type="explore-ingrediente" />
        <Footer />
      </div>
    );
  }
}

ExploreFoodIngredientes.propTypes = {
  fetchFood: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchFood: (payload1, payload2) => dispatch(fetchFoodApi(payload1, payload2)),
});

export default connect(null, mapDispatchToProps)(ExploreFoodIngredientes);
