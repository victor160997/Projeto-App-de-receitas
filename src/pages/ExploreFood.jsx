import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderExplore from '../components/HeaderExplore';

export default class ExploreFood extends Component {
  render() {
    return (
      <div>
        <HeaderExplore titlePage="Explorar Comidas" />
        Explorar comidas
        <Link to="/explorar/comidas/ingredientes">
          <h3>Por Ingredientes</h3>
        </Link>
        <Link to="/explorar/comidas/area">
          <h3>Por Local de Origem</h3>
        </Link>
      </div>
    );
  }
}
