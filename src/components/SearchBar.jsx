import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const theKey = event.target.name;
    this.setState({ [theKey]: event.target.value });
  }

  render() {
    const { searchInput } = this.state;
    return (
      <form>
        <label htmlFor="search-input">
          <input
            type="text"
            data-testid="search-input"
            id="search-input"
            name="searchInput"
            value={ searchInput }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="ingredient-search-radio">
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            name="radioSearch"
            value="ingredient-search-radio"
            onClick={ this.handleChange }
          />
          Ingrediente
        </label>
        <label htmlFor="name-search-radio">
          <input
            type="radio"
            data-testid="name-search-radio"
            name="radioSearch"
            value="name-search-radio"
            onClick={ this.handleChange }
          />
          Nome
        </label>
        <label htmlFor="first-letter-search-radio">
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            name="radioSearch"
            value="first-letter-search-radio"
            onClick={ this.handleChange }
          />
          Primeira letra
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
        >
          Buscar
        </button>
      </form>
    );
  }
}
