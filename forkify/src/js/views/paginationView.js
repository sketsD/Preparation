import View from './View.js';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(callback) {
    this._parentElement.addEventListener('click', function (e) {
      if (!e.target.closest('.btn--inline')) return;

      const btn = e.target.closest('.btn--inline');
      const page = Number(btn.dataset.goto);
      console.log(page);

      callback(page);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    // console.log(typeof this._data.page);

    if (this._data.page === 1 && numPages > 1) {
      console.log('Page 1 and others');
      return this._generateButtons('next', '');
    }

    if (this._data.page === numPages && numPages > 1) {
      console.log('This is the last page');
      return this._generateButtons('', 'prev');
    }

    if (this._data.page < numPages) {
      console.log('Somewhere in the middle');
      return this._generateButtons('next', 'prev');
    }
    return '';
  }

  _generateButtons(right = '', left = '') {
    let btn = '';
    let next = right
      ? `<button data-goto="${
          this._data.page + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>`
      : ``;

    let prev = left
      ? `
       <button data-goto="${
         this._data.page - 1
       }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
        </button>`
      : '';

    btn = btn.concat(next, prev);

    return btn;
  }
}
export default new paginationView();
