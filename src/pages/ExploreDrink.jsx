import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderExplore from '../components/HeaderExplore';

export default class ExploreDrink extends Component {
  render() {
    return (
      <div>
        <HeaderExplore titlePage="Explorar Bebidas" />
        Explorar Bebidas
        <Link to="/explorar/bebidas/ingredientes">
          <h3>Por Ingredientes</h3>
        </Link>
        <Footer />
      </div>
    );
  }
}
