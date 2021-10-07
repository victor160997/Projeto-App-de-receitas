import React, { useEffect, useState } from 'react';
import HeaderExplore from '../components/HeaderExplore';
import MadeCards from '../components/MadeCards';

export default function RecipesMade() {
  const [mades, setMades] = useState([]);
  const [madesFiltered, setMadesFiltered] = useState([]);

  useEffect(() => {
    const getFavorites = () => {
      const madesResults = JSON.parse(localStorage.getItem('doneRecipes'));
      if (madesResults && madesResults.length > 0) {
        setMades(madesResults);
        setMadesFiltered(madesResults);
      }
    };

    getFavorites();
  }, []);

  const onFilterClick = ({ target: { name } }) => {
    if (name === 'all') {
      setMadesFiltered(mades);
      return;
    }
    if (name === 'food') {
      const newFilter = mades.filter((made) => (
        made.type === 'comida'));

      setMadesFiltered(newFilter);
      return;
    }

    const newFilter = mades.filter((made) => made.type === 'bebida');
    setMadesFiltered(newFilter);
  };

  return (
    <section>
      <HeaderExplore titlePage="Receitas Favoritas" />
      <div className="favorite-section">
        <div className="filter-section">
          <button
            data-testid="filter-by-all-btn"
            type="button"
            name="all"
            onClick={ onFilterClick }
          >
            All
          </button>
          <button
            data-testid="filter-by-food-btn"
            type="button"
            name="food"
            onClick={ onFilterClick }
          >
            Food
          </button>
          <button
            data-testid="filter-by-drink-btn"
            type="button"
            name="drink"
            onClick={ onFilterClick }
          >
            Drinks
          </button>
        </div>
        { madesFiltered.map((recipeMade, index) => (
          <MadeCards
            key={ recipeMade.id }
            img={ recipeMade.image }
            category={ recipeMade.category }
            name={ recipeMade.name }
            data={ recipeMade.doneDate }
            tags={ recipeMade.tags }
            index={ index }
            id={ recipeMade.id }
            type={ recipeMade.type }
            area={ recipeMade.area }
            alcoholic={ recipeMade.alcoholicOrNot }
          />
        )) }
      </div>
    </section>
  );
}
