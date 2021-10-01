import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ExploreByArea from '../components/ExploreByArea';
import { fetchFoodApi } from '../redux/actions';
import Recipes from '../components/Recipes';

class ExploreFoodArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'American',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { fetchFood } = this.props;
    const { selected } = this.state;
    fetchFood('list.php?a=', 'list');
    fetchFood('filter.php?a=', selected);
  }

  componentDidUpdate(prevsState) {
    const { selected } = this.state;
    const { fetchFood } = this.props;
    if (selected !== prevsState.selected && selected !== 'All') {
      fetchFood('filter.php?a=', selected);
    }
    if (selected !== prevsState.selected && selected === 'All') {
      fetchFood('search.php?s=', '');
    }
  }

  handleChange({ target }) {
    this.setState({ selected: target.value });
  }

  render() {
    return (
      <div>
        <Header titlePage="Explorar Origem" />
        <ExploreByArea handleChange={ this.handleChange } />
        <Recipes type="Comidas" />
        <Footer />
      </div>
    );
  }
}

ExploreFoodArea.propTypes = {
  fetchFood: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchFood: (payload1, payload2) => dispatch(fetchFoodApi(payload1, payload2)),
});

export default connect(null, mapDispatchToProps)(ExploreFoodArea);
