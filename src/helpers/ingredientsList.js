function createListIngredients(recipe) {
  const NUMBER_OF_INGREDIENTS = 20;
  let ingredientsList = [];
  for (let i = 1; i <= NUMBER_OF_INGREDIENTS; i += 1) {
    if (recipe[`strIngredient${i}`] && recipe[`strIngredient${i}`].trim()) {
      ingredientsList = [...ingredientsList,
      `${recipe[`strIngredient${i}`]}${recipe[`strMeasure${i}`]
        && recipe[`strMeasure${i}`].trim() ? ` - ${recipe[`strMeasure${i}`]}` : ''}`];
    } else break;
  }
  return ingredientsList;
}

export default createListIngredients;
