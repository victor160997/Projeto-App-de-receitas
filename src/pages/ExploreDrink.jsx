import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderExplore from '../components/HeaderExplore';

export default class ExploreDrink extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
    };
    this.surpriseButton = this.surpriseButton.bind(this);
  }

  componentDidMount() {
    this.surpriseButton();
  }

  async surpriseButton() {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    const data = await response.json();
    const newId = await data.drinks[0].idDrink;
    this.setState(({
      id: newId,
    }));
  }
  
  render() {
    const { id } = this.state;
    return (  
      <div>
        <HeaderExplore titlePage="Explorar Bebidas" />
        Explorar Bebidas
        <Link to="/explorar/bebidas/ingredientes" data-testid="explore-by-ingredient">
          Por Ingredientes
        </Link>
        <Link to={`/bebidas/${id}`} onClick={ this.surpriseButton } data-testid="explore-surprise">
          Me Surpreenda!
        </Link>
        <Footer />
      </div>
    );
  }
}
