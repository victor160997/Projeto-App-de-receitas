import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import HeaderExplore from '../components/HeaderExplore';
import { fetchFoodApi } from '../redux/actions';
import IngredientCard from '../components/IngredientCard';

class ExploreFoodIngredientes extends Component {
  componentDidMount() {
    const { fetchFood } = this.props;
    fetchFood('categories.php', '');
  }

  render() {
    const { foodData, data } = this.props;
    return (
      <div>
        <HeaderExplore titlePage="Explorar Ingredientes" />
        <IngredientCard foodData={ foodData } />
        <Footer />
      </div>
    );
  }
}
/*
ExploreFoodIngredientes.propTypes = {
  foodData: PropTypes.func.isRequired,
};
*/
const mapStateToProps = ({ foodData }) => ({
  foodData: foodData.categoriesData,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFood: (payload1, payload2) => dispatch(fetchFoodApi(payload1, payload2)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreFoodIngredientes);
