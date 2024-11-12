import View from './View';
import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
import { state } from '../module';

// console.log(Fraction);

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _successMessage = 'Your recipe was successfully uploaded! ';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    // this.addHandlerUpload();
  }
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  //   _addHandlerShowWindow() {
  //     this._btnOpen.addEventListener(
  //       'click',
  //       function () {
  //         this._overlay.classList.toggleWindow('hidden');
  //         this._window.classList.toggleWindow('hidden');
  //       }.bind(this)
  //     );
  //   }

  addHandlerUpload(callback) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      //   const data = Object.fromEntries(dataArr);
      //   callback(data);
      callback(dataArr);
    });
  }

  _generateMarkup() {
    return ``;
  }
}

export default new addRecipeView();
