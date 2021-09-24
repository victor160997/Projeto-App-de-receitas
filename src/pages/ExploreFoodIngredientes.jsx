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
    const { foodData } = this.props;
    return (
      <div>
        <HeaderExplore titlePage="Explorar Ingredientes" />
        <Recipes type="Ingrediente" foodData={ foodData } />
        <Footer />
      </div>
    );
  }
}

ExploreFoodIngredientes.propTypes = {
  foodData: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchFood: PropTypes.func.isRequired,
};

const mapStateToProps = ({ foodData }) => ({
  foodData: foodData.categoriesData,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFood: (payload1, payload2) => dispatch(fetchFoodApi(payload1, payload2)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreFoodIngredientes);
