import React, { Component } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

class FoodRecipes extends Component {
  render() {
    const Comidas = 'Comidas';
    return (
      <div>
        <Header titlePage={ Comidas } />
        Food Recipes
        <Recipes type={ Comidas } />
        <Footer />
      </div>
    );
  }
}

export default FoodRecipes;
