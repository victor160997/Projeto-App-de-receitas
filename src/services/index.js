/*
https://www.themealdb.com/api/json/v1/1/filter.php?i={Onion}
https://www.themealdb.com/api/json/v1/1/search.php?s={coxinha}
https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra}

Ao selecionar Ingrediente e buscar por chicken, deve-se utilizar o endpoint
https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken.

Caso as receitas sejam de comida, deve-se carregar as 12 primeiras receitas obtidas através do endpoint
https://www.themealdb.com/api/json/v1/1/search.php?s=

Caso as receitas sejam de comida, deve-se exibir as 5 primeiras categorias de comida obtidas através do endpoint
https://www.themealdb.com/api/json/v1/1/list.php?c=list
*/

const foodURL = 'https://www.themealdb.com/api/json/v1/1/';

export default async function getFoodApi(type, food) {
  if (!food) {
    const response = await fetch(`${foodURL}${type}`);
    const data = await response.json();
    return data;
  }
  const response = await fetch(`${foodURL}${type}${food}`);
  const data = await response.json();
  return data;
}
