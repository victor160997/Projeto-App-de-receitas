import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDrinksApi, getFoodApi } from '../services';
import { filterFood } from '../redux/actions';
// import { fetchDrinkApi, fetchFoodApi } from '../redux/actions';

class CategoriesButton extends Component {
  constructor() {
    super();
    this.state = {
      response: '',
      arrayFoodData: [],
    };
    this.renderButton = this.renderButton.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  async componentDidMount() {
    const { category } = this.props;
    this.setResponse(category);
  }

  componentDidUpdate(props, state) {
    const { foodData } = this.props;
    if (state.arrayFoodData.length === 0 && foodData.length > 0) {
      this.updateState(foodData);
    }
  }

  async setResponse(category) {
    const requisition = category === 'meals'
      ? await getFoodApi('list.php?c=list', '')
      : await getDrinksApi('list.php?c=list', '');

    return this.setState({
      response: requisition[category],
    });
  }

  filterCategory({ target }) {
    const { name } = target;
    const { filterFoodProps } = this.props;
    const { arrayFoodData } = this.state;
    filterFoodProps(arrayFoodData.filter((food) => food.strCategory === name));
  }

  updateState(data) {
    return this.setState({ arrayFoodData: data });
  }

  renderButton(response) {
    const four = 4;
    return response.map((categ, index) => {
      if (index <= four) {
        return (
          <button
            name={ Object.values(categ)[0] }
            type="button"
            data-testid={ `${Object.values(categ)[0]}-category-filter` }
            key={ Object.values(categ)[0] }
            onClick={ (e) => this.filterCategory(e) }
          >
            {Object.values(categ)[0]}
          </button>
        );
      }
      return undefined;
    });
  }

  render() {
    const { response } = this.state;
    return (
      <div>
        { response !== '' ? this.renderButton(response) : <span> Carregando </span> }
        Categories
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  foodData: state.foodData.data,
  drinkData: state.drinkData.data,
});

const mapDispatchToProps = (dispatch) => ({
  filterFoodProps: (payload1, payload2) => dispatch(filterFood(payload1, payload2)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesButton);

CategoriesButton.propTypes = {
  category: PropTypes.string.isRequired,
  filterFoodProps: PropTypes.func.isRequired,
  foodData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
