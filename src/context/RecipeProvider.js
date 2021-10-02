import React, { useState, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import RecipeContext from '.';
import {
  searchByFirstLetterApi,
  searchByIngredientsApi,
  searchByNameApi,
} from '../service/api';

export default function RecipeProvider({ children }) {
  const MAX_NUMBER_OF_ITEMS = 12;
  const textAlert = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  const { pathname } = useLocation();
  const [pathMeal, setPathMeal] = useState(pathname.includes('comidas'));
  const [routeFromSearch, setRouteFromSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [checkedRadio, setCheckedRadio] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [redirectSearchBar, setRedirectSearchBar] = useState(false);
  const [recipes, setRecipes] = useState([{}]);
  const [suggestions, setSuggestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [toggleBtnCategories, setToggleBtnCategories] = useState(false);
  const [searchIngredient, setSearchIngredient] = useState('');
  const [searchOrigin, setSearchOrigin] = useState(false);
  const [idDetail, setIdDetail] = useState('');
  const [idProgress, setIdProgress] = useState('');
  const [recipeInProgress, setRecipeInProgress] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [isRandom, setIsRandom] = useState(false);
  const [filters, setFilters] = useState([]);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    setPathMeal(pathname.includes('comidas'));
    console.log(`pathMeal #2: ${pathMeal ? 'comidas' : 'bebidas'}`);
  }, [pathname]);

  useEffect(() => {
    async function requestByIngredients() {
      const returnIngredients = await searchByIngredientsApi(inputValue, routeFromSearch);
      if (returnIngredients === null) {
        return global.alert(textAlert);
      }
      const limitedRecipes = returnIngredients.slice(0, MAX_NUMBER_OF_ITEMS);
      setRecipes(limitedRecipes);
    }
    const requestByName = async () => {
      const returnName = await searchByNameApi(inputValue, routeFromSearch);
      if (returnName === null) {
        return global.alert(textAlert);
      }
      const limitedRecipes = returnName.slice(0, MAX_NUMBER_OF_ITEMS);
      setRecipes(limitedRecipes);
    };
    const requestByLetter = async () => {
      const returnLetter = await searchByFirstLetterApi(inputValue, routeFromSearch);
      if (returnLetter === null) {
        return global.alert(textAlert);
      }
      const limitedRecipes = returnLetter.slice(0, MAX_NUMBER_OF_ITEMS);
      setRecipes(limitedRecipes);
    };
    if (redirectSearchBar) {
      if (checkedRadio === 'Ingredientes') {
        requestByIngredients();
        setRedirectSearchBar(false);
      } else if (checkedRadio === 'Nome') {
        requestByName();
        setRedirectSearchBar(false);
      } else if (checkedRadio === 'Primeira letra') {
        requestByLetter();
        setRedirectSearchBar(false);
      }
    }
  }, [redirectSearchBar]);

  function redirectDetailPage() {
    if (routeFromSearch === '/comidas') {
      return <Redirect to={`${routeFromSearch}/${recipes[0].idMeal}`} />;
    }
    if (routeFromSearch === '/bebidas') {
      return <Redirect to={`${routeFromSearch}/${recipes[0].idDrink}`} />;
    }
  }

  return (
    <RecipeContext.Provider
      value={{
        details,
        setDetails,
        filters,
        setFilters,
        pathMeal,
        setPathMeal,
        searchOrigin,
        setSearchOrigin,
        isRandom,
        setIsRandom,
        isDisable,
        setIsDisable,
        isFavorite,
        setIsFavorite,
        recipeInProgress,
        setRecipeInProgress,
        idProgress,
        setIdProgress,
        idDetail,
        setIdDetail,
        areas,
        showSearch,
        setShowSearch,
        setCheckedRadio,
        setInputValue,
        setRedirectSearchBar,
        setRouteFromSearch,
        routeFromSearch,
        recipes,
        setRecipes,
        suggestions,
        setSuggestions,
        categories,
        ingredients,
        searchIngredient,
        setSearchIngredient,
        setSelectedCategory,
        selectedCategory,
        setToggleBtnCategories,
        toggleBtnCategories,
        checkedIngredients,
        setCheckedIngredients,
      }}
    >
      {recipes.length === 1 && redirectDetailPage()}
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
