import { AJAXcall, sendJSON, AJAXcall } from './views/helpers';
import { API_URL, RES_PER_PAGE, SEARCH_API, KEY } from './config';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data;
  return {
    publisher: recipe.publisher,
    id: recipe.id,
    cookingTime: recipe.cooking_time,
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const recipe = await AJAXcall(`${API_URL}/${id}?key=${KEY}`);
    state.recipe = createRecipeObject(recipe);

    // state.recipe = {
    //   publisher: recipe.publisher,
    //   id: recipe.id,
    //   cookingTime: recipe.cooking_time,
    //   image: recipe.image_url,
    //   ingredients: recipe.ingredients,
    //   servings: recipe.servings,
    //   sourceUrl: recipe.source_url,
    //   title: recipe.title,
    // };
    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const { recipes } = await AJAXcall(`${API_URL}?search=${query}&key=${KEY}`);
    // console.log(recipes);
    if (recipes.length === 0) throw new Error('No results');
    state.search.page = 1;
    state.search.results = recipes.map(recipe => {
      return {
        publisher: recipe.publisher,
        id: recipe.id,
        image: recipe.image_url,
        title: recipe.title,
        ...(recipe.key && { key: recipe.key }),
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; // 0;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    // console.log(ing.quantity);
    ing.quantity = (ing.quantity / state.recipe.servings) * newServings;
    // console.log(ing.quantity);
  });
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookMark = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
  // console.log(state.recipe);
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

export const uploadRecipe = async function (newRecipe) {
  // const data = Object.fromEntries(newRecipe);
  // const ingridients = Object.entries(data);
  // console.log(ingridients);
  try {
    const ingredients = newRecipe
      .filter(entry => entry[0].includes('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArray = ing[1].split(',').map(el => el.trim());
        if (ingArray.length !== 3)
          throw new Error(
            'Wrong ingredients format! Please, use the correct format :)'
          );

        const [quantity, unit, description] = ingArray;
        console.log(ing);
        console.log(quantity, unit, description);
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    newRecipe = Object.fromEntries(newRecipe);
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await AJAXcall(`${API_URL}?key=${KEY}`, recipe);

    state.recipe = createRecipeObject(data);
    addBookMark(state.recipe);
  } catch (err) {
    throw err;
  }

  // console.log(data);
};
