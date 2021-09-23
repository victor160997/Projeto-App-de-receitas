import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    const { fetchDrink } = this.props;
    return fetchDrink('search.php?s=', '');
  }

  redirectDetailsDrink(id) {
    const { history } = this.props;
    history.push(`bebidas/${id}`);
  }

  render() {
    const { fetchDrink } = this.props;
    const Bebidas = 'Bebidas';
    return (
      <div>
        <Header titlePage={ Bebidas } fetchApi={ fetchDrink } />
        Drink Recipes
        <Recipes type={ Bebidas } redirectDetailsDrink={ this.redirectDetailsDrink } />
        <Footer />
      </div>
    );
  }
}

DrinkRecipes.propTypes = {
  fetchDrink: PropTypes.func.isRequired,
  history: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchDrink: (payload1, payload2) => dispatch(fetchDrinkApi(payload1, payload2)),
});

export default connect(null, mapDispatchToProps)(DrinkRecipes);
