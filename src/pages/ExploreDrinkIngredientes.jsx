import React, { Component } from 'react';
import Footer from '../components/Footer';
import HeaderExplore from '../components/HeaderExplore';

export default class ExploreDrinkIngredientes extends Component {
  render() {
    return (
      <div>
        <HeaderExplore titlePage="Explorar Ingredientes" explore />
        <Footer />
      </div>
    );
  }
}
