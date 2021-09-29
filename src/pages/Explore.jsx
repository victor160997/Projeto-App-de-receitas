import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderExplore from '../components/HeaderExplore';

class Explore extends Component {
  render() {
    return (
      <div>
        <HeaderExplore titlePage="Explorar" />
        <Link to="/explorar/comidas" data-testid="explore-food">
          Explorar Comidas
        </Link>
        <Link to="/explorar/bebidas" data-testid="explore-drinks">
          Explorar Bebidas
        </Link>
        <Footer />
      </div>
    );
  }
}

export default Explore;
