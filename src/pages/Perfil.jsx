import React, { Component } from 'react';
import Footer from '../components/Footer';
import HeaderExplore from '../components/HeaderExplore';

class Perfil extends Component {
  render() {
    return (
      <div>
        <HeaderExplore titlePage="Perfil" />
        Perfil
        <Footer />
      </div>
    );
  }
}

export default Perfil;
