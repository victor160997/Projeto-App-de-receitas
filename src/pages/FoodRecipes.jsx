import React, { Component } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

class FoodRecipes extends Component {
  render() {
    return (
      <div>
        <Header titlePage="Comidas" />
        Food Recipes
        <Footer />
      </div>
    );
  }
}

export default FoodRecipes;
