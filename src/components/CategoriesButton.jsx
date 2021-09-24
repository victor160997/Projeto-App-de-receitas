import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDrinksApi, getFoodApi } from '../services';
import { filterDrink, filterFood } from '../redux/actions';

class CategoriesButton extends Component {
  constructor() {
    super();
    this.state = {
      response: '',
      type: '',
      filterSelect: '',
    };
    this.renderButton = this.renderButton.bind(this);
  }

  async componentDidMount() {
    const { category } = this.props;
    this.setResponse(category);
  }

  async setResponse(category) {
    const requisition = category === 'meals'
      ? await getFoodApi('list.php?c=list', '')
      : await getDrinksApi('list.php?c=list', '');

    return this.setState({
      response: requisition[category],
      type: category,
    });
  }

  async filterCategory({ target }) {
    const { name } = target;
    const { filterSelect } = this.state;
    const { type } = this.state;
    if (type === 'meals') {
      const { filterFoodProps } = this.props;
      if (filterSelect === name || name === 'all') {
        this.setState({ filterSelect: '' });
        const resp = await getFoodApi('search.php?s=', '');
        return filterFoodProps(resp.meals);
      }
      const resp = await getFoodApi(`filter.php?c=${name}`, '');
      this.setState({ filterSelect: name });
      filterFoodProps(resp.meals);
    } else {
      const { filterDrinkProps } = this.props;
      if (filterSelect === name || name === 'all') {
        this.setState({ filterSelect: '' });
        const resp = await getDrinksApi('search.php?s=', '');
        return filterDrinkProps(resp.drinks);
      }
      const resp = await getDrinksApi(`filter.php?c=${name}`, '');
      this.setState({ filterSelect: name });
      filterDrinkProps(resp.drinks);
    }
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
        <button
          name="all"
          data-testid="All-category-filter"
          type="button"
          onClick={ (e) => this.filterCategory(e) }
        >
          All
        </button>
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
  filterDrinkProps: (payload1, payload2) => dispatch(filterDrink(payload1, payload2)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesButton);

CategoriesButton.propTypes = {
  category: PropTypes.string.isRequired,
  filterFoodProps: PropTypes.func.isRequired,
  filterDrinkProps: PropTypes.func.isRequired,
  /* foodData: PropTypes.arrayOf(PropTypes.object).isRequired, */
};

/* async filterAllCategorys({ target }) {
    const { name } = target;
    const { filterSelect } = this.state;
    const { type } = this.state;
    const arrayCategories = await getFoodApi('list.php?c=list', '');
    if (type === 'meals') {
      const { filterFoodProps } = this.props;
      if (filterSelect === name) {
        this.setState({ filterSelect: '' });
        const resp = await getFoodApi('search.php?s=', '');
        return filterFoodProps(resp.meals);
      }
      this.setState({ filterSelect: name });
      let arrayAllFood = [];
      arrayCategories.meals.map(async (cat, i) => {
        const four = 4;
        if (i <= four) {
          const resp = await getFoodApi(`filter.php?c=${cat.strCategory}`, '');
          arrayAllFood = [...arrayAllFood, ...resp.meals];
          console.log(arrayAllFood);
        }
        return undefined;
      });
      filterFoodProps(arrayAllFood);
    }
  } */
