import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import DrinkRecipes from './pages/DrinkRecipes';
import Explore from './pages/Explore';
import Favorites from './pages/Favorites';
import FoodRecipes from './pages/FoodRecipes';
// import Login from './pages/Login';
import Perfil from './pages/Perfil';
import RecipesMade from './pages/RecipesMade';
import Header from './pages/Header';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/comidas" component={ FoodRecipes } />
        <Route path="/bebidas" component={ DrinkRecipes } />
        <Route path="/explorar" component={ Explore } />
        <Route path="/perfil" component={ Perfil } />
        <Route path="/receitas-feitas" component={ RecipesMade } />
        <Route path="/receitas-favoritas" component={ Favorites } />
        <Route path="/" component={ Header } />
      </Switch>
    );
  }
}

export default App;
