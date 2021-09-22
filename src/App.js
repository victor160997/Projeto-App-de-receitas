import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ExploreDrinkIngredientes from './pages/ExploreDrinkIngredientes';
import ExploreFoodArea from './pages/ExploreFoodArea';
import ExploreFoodIngredientes from './pages/ExploreFoodIngredientes';

class App extends Component {
  render() {
    return (
      <Switch>
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
        <Route path="/" component={ Login } />
      </Switch>
    );
  }
}

export default App;
