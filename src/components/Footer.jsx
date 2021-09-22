import React, { Component } from 'react';
import '../styles/footer.css';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default class Footer extends Component {
  render() {
    return (
      <footer data-testid="footer" className="footer-menu">
        <Link
          to="/bebidas"
          data-testid="drinks-bottom-btn"
          alt="Icon drink"
          src={ drinkIcon }
        >
          <img src={ drinkIcon } alt="Drink icon" />
        </Link>
        <Link
          to="/explorar"
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
        >
          <img src={ exploreIcon } alt="Explore Icon" />
        </Link>
        <Link
          to="/comidas"
          data-testid="food-bottom-btn"
          src={ mealIcon }
        >
          <img src={ mealIcon } alt="Meal Icon" />
        </Link>
      </footer>
    );
  }
}
