import { useState, useEffect, useContext } from 'react';
import RecipeContext from '../context';

const useInProgressRecipes = (key) => {
  const [countChecked, setCountChecked] = useState(0);
  const { idProgress, setIdProgress, setCheckedIngredients } = useContext(RecipeContext);

  useEffect(() => {
    const recipesInProgress = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: {}, meals: {} };
    const storedRecipe = recipesInProgress[key] ? Object.entries(recipesInProgress[key])
      .find((recipeId) => recipeId[0] === idProgress) : false;
    if (storedRecipe) {
      setIdProgress(storedRecipe[0]);
      setCheckedIngredients(storedRecipe[1]);
      setCountChecked(storedRecipe[1].length);
    }
  }, [idProgress]);

  return [countChecked, setCountChecked];
};

export default useInProgressRecipes;
