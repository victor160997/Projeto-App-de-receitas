import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
<<<<<<< HEAD
import Details from './pages/Details';
=======
import Details from './pages/Deatails';
>>>>>>> c2dbbfe1444c556d2b41b89734ab1ada46c76409
import DrinkRecipes from './pages/DrinkRecipes';
import Explore from './pages/Explore';
import ExploreDrink from './pages/ExploreDrink';
import ExploreDrinkIngredientes from './pages/ExploreDrinkIngredientes';
import ExploreFood from './pages/ExploreFood';
import ExploreFoodArea from './pages/ExploreFoodArea';
import ExploreFoodIngredientes from './pages/ExploreFoodIngredientes';
import Favorites from './pages/Favorites';
import FoodRecipes from './pages/FoodRecipes';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import RecipesMade from './pages/RecipesMade';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/comidas" component={ FoodRecipes } />
        <Route exact path="/bebidas" component={ DrinkRecipes } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/receitas-feitas" component={ RecipesMade } />
        <Route exact path="/receitas-favoritas" component={ Favorites } />
        <Route exact path="/explorar/comidas" component={ ExploreFood } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrink } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExploreFoodIngredientes }
        />
        <Route
          exact
          path="/explorar/comidas/area"
          component={ ExploreFoodArea }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExploreDrinkIngredientes }
        />
<<<<<<< HEAD
        <Route
          exact
          path="/comidas/:id"
          render={ (props) => <Details { ...props } /> }
        />
        <Route
          exact
          path="/bebidas/:id"
          render={ (props) => <Details { ...props } /> }
        />
=======
        <Route path="/comidas/:idMeal" component={ Details } />
        <Route path="/bebidas/:idDrink" component={ Details } />
>>>>>>> c2dbbfe1444c556d2b41b89734ab1ada46c76409
        <Route path="/" component={ Login } />
      </Switch>
    );
  }
}

export default App;
