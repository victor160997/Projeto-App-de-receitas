import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ExploreByArea from '../components/ExploreByArea';
import { fetchFoodApi } from '../redux/actions';

class ExploreFoodArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { fetchFood } = this.props;
    fetchFood('list.php?a=', 'list');
  }

  handleChange({ target }) {
    this.setState({ selected: target.value });
  }

  render() {
    return (
      <div>
        <Header titlePage="Explorar Origem" />
        <ExploreByArea handleChange={ this.handleChange } />
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
