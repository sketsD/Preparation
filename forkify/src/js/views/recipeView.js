import View from './View';
import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
import { state } from '../module';

// console.log(Fraction);

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _successMessage =
    'Start by searching for a recipe or an ingredient. Have fun!';

  addHandlerRender(callback) {
    ['hashchange', 'load'].forEach(eTrigger =>
      window.addEventListener(eTrigger, callback)
    );
  }

  addHandlerUpdateServings(callback) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--tiny');
      if (!btn) return;
      // if (btn.classList.contains('btn--increase-servings')) console.log(btn);
      // if (btn.classList.contains('btn--decrease-servings')) console.log(btn);
      const updateTo = Number(btn.dataset.updateTo);
      if (updateTo === 0) return;
      callback(updateTo);
    });
  }

  addHandlerAddBookmark(callbaack) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      console.log(btn);
      callbaack();
    });
  }

  _generateMarkup() {
    return `
    <figure class="recipe__fig">
      <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            this._data.servings
          }</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--decrease-servings" data-update-to="${
              this._data.servings - 1
            }">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings" data-update-to="${
              this._data.servings + 1
            }">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark ">
          <svg class="">
            <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">

        ${this._data.ingredients
          .map(ingredient => this._generateIngridient(ingredient))
          .join('')}

        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            this._data.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
  `;
  }

  _generateIngridient(ingredient) {
    // console.log(
    //   new Fraction(Math.round(ingredient.quantity * 10) / 10).toString()
    // );
    return `
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${
            // new Fraction(ingredient.quantity).toString()
            ingredient.quantity
              ? // ? new Fraction(ingredient.quantity).toString()
                new Fraction(
                  Math.round(ingredient.quantity * 10) / 10
                ).toString()
              : ''
            // ingredient.quantity
          }</div>
          <div class="recipe__description">
            <span class="recipe__unit">${
              ingredient.unit ? ingredient.unit : ''
            }</span>
            ${ingredient.description}
          </div>
        </li>
        `;
  }
}

export default new RecipeView();
