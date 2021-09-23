import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDrinkApi as fetchDrinkApiAction } from '../redux/actions';

class MODELO extends React.Component {
  constructor() {
    super();
    this.state = {
      type: 'search.php?f=',
      drink: 'c',
    };
  }

  componentDidMount() {
    const { fetchDrinkApi } = this.props;
    const { drink, type } = this.state;
    fetchDrinkApi(type, drink);
  }

  render() {
    return (
      <div>
        x
      </div>
    );
  }
}

MODELO.propTypes = {
  fetchDrinkApi: PropTypes.func.isRequired,
};

const mapStateToProps = (data) => ({
  data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDrinkApi: (p1, p2) => dispatch(fetchDrinkApiAction(p1, p2)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MODELO);
