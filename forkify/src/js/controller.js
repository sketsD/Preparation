import * as module from './module.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

// Parcel to stop reload the page after each small chages in the code
// if (module.hot) {
//   module.hot.accept();
// }
// __________________________________________________________________

const controlRecipes = async function () {
  try {
    // To load current page with recipe id
    const id = window.location.hash.slice(1);
    if (!id) return;
    // Assume this ID as start point of the application '664c8f193e7aa067e94e89c7';
    // And site is http://localhost:1234/#664c8f193e7aa067e94e89c7

    // 1) Loading recipe________________________________________________________________
    recipeView.renderSpinner();

    bookmarksView.update(module.state.bookmarks);

    await module.loadRecipe(id);

    // 2) Loading recipe________________________________________________________________
    recipeView.render(module.state.recipe);
    if (id === '664c8f193e7aa067e94e89c7') return;
    resultsView.update(module.getSearchResultsPage());
  } catch (err) {
    // console.log(err);
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQurery();
    if (!query) return;
    await module.loadSearchResults(query);
    // console.log(module.state.search.query);
    // console.log(module.state.search.results);

    resultsView.checkData();
    resultsView.render(module.getSearchResultsPage());
    paginationView.render(module.state.search);
  } catch (err) {
    console.log(err.message);
    resultsView.renderError();
  }
};

const controplPagination = function (page) {
  resultsView.update(module.getSearchResultsPage(page));
  paginationView.render(module.state.search);
};

const controlServings = function (updateTo) {
  module.updateServings(updateTo);
  // recipeView.render(module.state.recipe);
  recipeView.update(module.state.recipe);
};

const controlBookmark = function () {
  // console.log(module.state.recipe.bookmarked);
  if (module.state.recipe.bookmarked)
    module.deleteBookmark(module.state.recipe.id);
  else module.addBookMark(module.state.recipe);

  recipeView.update(module.state.recipe);
  bookmarksView.render(module.state.bookmarks);
};

const controlBookmarkLoad = function () {
  bookmarksView.render(module.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Render Spinner
    addRecipeView.renderSpinner();

    // Upload new recipe
    await module.uploadRecipe(newRecipe);

    // render bookmarks in the list
    bookmarksView.render(module.state.bookmarks);

    // render own current recipe
    recipeView.render(module.state.recipe);

    // Show success message
    addRecipeView.renderMessage();

    // Change ID in URL
    window.history.pushState(null, '', `#${module.state.recipe.id}`);

    // close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  resultsView.renderMessage();
  paginationView.addHandlerClick(controplPagination);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerRender(controlSearchResults);
  recipeView.addHandlerAddBookmark(controlBookmark);
  bookmarksView.addHandlerAddBookmarkLoad(controlBookmarkLoad);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

// ['hashchange', 'load'].forEach(eTrigger =>
//   window.addEventListener(eTrigger, callback)
// );
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
