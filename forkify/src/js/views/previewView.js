import View from './View.js';
import icons from 'url:../../img/icons.svg';

export default class previewView extends View {
  _generateMarkup() {
    const markup = this._data
      .map(recipe => this._generateMarkupPreview(recipe))
      .join('');
    return markup;
  }
  _generateMarkupPreview(recipe) {
    const currentID = window.location.hash.slice(1);
    // let class = "preview__link preview__link--active"
    // if(recipe.id===currentID)
    return `
            <li class="preview">
                <a class="preview__link ${
                  recipe.id === currentID ? 'preview__link--active' : ''
                }" href="#${recipe.id}">
                    <figure class="preview__fig">
                        <img src="${recipe.image}" alt="${recipe.title}" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${recipe.title}</h4>
                        <p class="preview__publisher">${recipe.publisher}</p>
                        <div class="recipe__user-generated ${
                          recipe.key ? '' : 'hidden'
                        }">
                          <svg>
                            <use href="${icons}#icon-user"></use>
                          </svg>
                        </div>
                    </div>

                </a>
            </li>
        `;
  }
}
