import previewView from './previewView.js';

class bookmarksView extends previewView {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet! Add your favorite one!';
  _successMessage = 'Add your favorite recipe!';

  addHandlerAddBookmarkLoad(callBack) {
    window.addEventListener('load', callBack());
  }
}
export default new bookmarksView();
