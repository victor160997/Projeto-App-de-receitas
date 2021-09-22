import React, { Component } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default class DrinkRecipes extends Component {
  render() {
    return (
      <div>
        <Header titlePage="Bebidas" />
        Drink Recipes
        <Footer />
      </div>
    );
  }
}
