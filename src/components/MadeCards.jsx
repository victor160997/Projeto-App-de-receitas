import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copyToClipBoard from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

export default class MadeCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sharedLink: false,
    };
    this.shareLink = this.shareLink.bind(this);
  }

  shareLink(id, type) {
    const url = window.location.href.replace('/receitas-feitas', `/${type}s/${id}`);
    copyToClipBoard(url);
    this.setState({ sharedLink: true });
  }

  render() {
    const { img, category, name, data, tags, index,
      id, type, area, alcoholic } = this.props;
    const { sharedLink } = this.state;
    return (
      <div>
        <Link to={ `/${type}s/${id}` }>
          <img
            src={ img }
            alt=""
            data-testid={ `${index}-horizontal-image` }
            width="200px"
          />
        </Link>
        <button
          type="button"
          onClick={ () => this.shareLink(id, type) }
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="shareIcon"
          />
        </button>
        { sharedLink && <p className="copy-message">Link copiado!</p> }
        <h2
          data-testid={ `${index}-horizontal-top-text` }
        >
          { `${area} - ${category}` }
        </h2>
        <Link to={ `/${type}s/${id}` }>
          <h2 data-testid={ `${index}-horizontal-name` }>{ name }</h2>
        </Link>
        { alcoholic !== ''
          && <span data-testid={ `${index}-horizontal-top-text` }>{ alcoholic }</span> }
        <h2 data-testid={ `${index}-horizontal-done-date` }>{ data }</h2>
        <h2>
          { tags !== '' ? tags.map((tag) => (
            <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
              { ` #${tag}` }
            </span>
          )) : '' }
        </h2>
      </div>
    );
  }
}

MadeCards.propTypes = {
  category: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  alcoholic: PropTypes.string.isRequired,
};
