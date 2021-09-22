import React, { Component } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

export default class DrinkRecipes extends Component {
  render() {
    const Bebidas = 'Bebidas';
    return (
      <div>
        <Header titlePage={ Bebidas } />
        Drink Recipes
        <Recipes type={ Bebidas } />
        <Footer />
      </div>
    );
  }
}
