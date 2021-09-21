import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import './Header.css';

export default class Header extends Component {
  render() {
    const { titlePage } = this.props;
    return (
      <header className="header-home-page">
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
        <img
          src={ searchIcon }
          alt="searchIcon"
          data-testid="search-top-btn"
        />
      </header>
    );
  }
}

Header.propTypes = {
  titlePage: PropTypes.string.isRequired,
};
