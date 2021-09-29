import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderExplore from '../components/HeaderExplore';

export default class ExploreFood extends Component {
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
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    const newId = await data.meals[0].idMeal;
    this.setState(({
      id: newId,
    }));
    console.log(data);
    this.surpriseButton.bind(this);
  }

  render() {
    const { id } = this.state;
    return (
      <div>
        <HeaderExplore titlePage="Explorar Comidas" />
        Explorar comidas
        <Link data-testid="explore-by-ingredient" to="/explorar/comidas/ingredientes">
          Por Ingredientes
        </Link>
        <Link to="/explorar/comidas/area" data-testid="explore-by-area">
          Por Local de Origem
        </Link>
        <Link to={ `/comidas/${id}` } data-testid="explore-surprise">
          Me Surpreenda!
        </Link>
        <Footer />
      </div>
    );
  }
}
