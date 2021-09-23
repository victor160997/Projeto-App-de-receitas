import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderExplore from '../components/HeaderExplore';

class Explore extends Component {
  render() {
    return (
      <div>
        <HeaderExplore titlePage="Explorar" />
        <Link to="/explorar/comidas">
          <h3>Explorar Comidas</h3>
        </Link>
        <Link to="/explorar/bebidas">
          <h3>Explorar Bebidas</h3>
        </Link>
        <Footer />
      </div>
    );
  }
}

export default Explore;
