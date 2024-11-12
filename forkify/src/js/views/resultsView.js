import previewView from './previewView.js';
import View from './View.js';
import icons from 'url:../../img/icons.svg';

class resultsView extends previewView {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes were found. Please try another one!';
  _successMessage =
    'Start by searching for a recipe or an ingredient. Have fun!';
}
export default new resultsView();
