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
          />
        </label>
      </form>
    );
  }
}
