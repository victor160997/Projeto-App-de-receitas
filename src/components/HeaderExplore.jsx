import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import './HeaderExplore.css';

export default class HeaderExplore extends Component {
  render() {
    const { titlePage } = this.props;
    return (
      <header className="header-explore-home-page">
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="profileIcon"
            data-testid="profile-top-btn"
          />
        </Link>
        <h2 data-testid="page-title">
          { titlePage }
        </h2>
      </header>
    );
  }
}

HeaderExplore.propTypes = {
  titlePage: PropTypes.string.isRequired,
};
