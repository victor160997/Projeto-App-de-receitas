import React from 'react';

export function redirectInProgress(recipe) {
  const storageProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (storageProgress
    && storageProgress.value
    && storageProgress.recipe
    && storageProgress.value !== ''
    && storageProgress.recipe !== '') {
    const recStorage = storageProgress.recipe.idMeal
      ? storageProgress.recipe.idMeal : storageProgress.recipe.idDrink;
    const recInit = recipe.idMeal
      ? recipe.idMeal : recipe.idDrink;
    if (recInit === recStorage) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        recipe,
        value: storageProgress.value,
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        recipe,
        value: '',
      }));
    }
  } else {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      recipe,
      value: '',
    }));
  }
}

export function renderButton(recipe) {
  const recInit = recipe.idMeal ? recipe.idMeal : recipe.idDrink;
  const storageDone = JSON.parse(localStorage.getItem('doneRecipes'));
  if (storageDone
    && storageDone.length > 0
    && storageDone.some((r) => r.id === recInit) === true) {
    return '';
  }
  const storageProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (storageProgress
    && storageProgress.value
    && storageProgress.recipe
    && storageProgress.value !== ''
    && storageProgress.recipe !== '') {
    const recStorage = storageProgress.recipe.idMeal
      ? storageProgress.recipe.idMeal : storageProgress.recipe.idDrink;
    if (recInit === recStorage) {
      return (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="button-iniciar"
          onClick={ () => redirectInProgress(recipe) }
          id="button-details-child"
        >
          Continuar Receita
        </button>
      );
    }
    return (
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="button-iniciar"
        onClick={ () => redirectInProgress(recipe) }
        id="button-details-child"
      >
        Iniciar Receita
      </button>
    );
  }
  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="button-iniciar"
      onClick={ () => redirectInProgress(recipe) }
      id="button-details-child"
    >
      Iniciar Receita
    </button>
  );
}

export function renderData() {
  const moment = new Date();
  return `${moment.getDate()}/${(moment.getMonth() + 1)}/${moment.getFullYear()}`;
}
