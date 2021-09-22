import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFoodApi as fetchFoodApiAction } from '../redux/actions';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      food: 'Onion',
      type: 'filter.php?i=',
    };
  }

  componentDidMount() {
    const { fetchFoodApi } = this.props;
    const { food, type } = this.state;
    fetchFoodApi(type, food);
  }

  render() {
    return (
      <div>
        x
      </div>
    );
  }
}

Header.propTypes = {
  fetchFoodApi: PropTypes.func.isRequired,
};

const mapStateToProps = (data) => ({
  data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFoodApi: (payload1, payload2) => dispatch(fetchFoodApiAction(payload1, payload2)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
