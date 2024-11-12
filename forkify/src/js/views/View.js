import icons from 'url:../../img/icons.svg';
export default class View {
  _data;
  render(data) {
    this._data = data;
    this.checkData();
    const markup = this._generateMarkup();
    this._clearHTML();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const newMarkup = this._generateMarkup();

    // _______________________________________________TO UPDATE CHANGED TEXT _____________________________________________________________
    // So we need to have ability to check whether the new DOM element is different from  the one we hav
    // so that we can update only the differencies. And the down below are  basicaly we creating virtually the new DOM to
    // compare
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    // ____________________________________________________________________________________________________________________________________
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    // ____________________________________________________________________________________

    if (newElements.length !== currentElements.length) return this.render(data);

    //_____________________________________________________________________________________

    newElements.forEach((newEl, i) => {
      const curEl = currentElements[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // So first child  its about nodes. To remind you each HTML element has its own nodes which are text, html, comments etc.
        // In this case its text and its value. USing trim method to cut some spaces

        curEl.textContent = newEl.textContent;
        // ___________________________________________________________________________________________________________________________________
      }

      // _______________________________________TO UPDATE CHANGED SERVINGS NUMBER ____________________________________________________________
      // if (!newEl.isEqualNode(curEl) && newEl.attributes['data-update-to']) {
      //   // console.log(Array.from(newEl.attributes));
      //   curEl.attributes['data-update-to'].textContent =
      //     newEl.attributes['data-update-to'].textContent;
      // }
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });

    // console.log(newElements);
  }
  _clearHTML() {
    this._parentElement.innerHTML = '';
  }
  checkData() {
    console.log(this._data);
  }
  renderError(errMessage = this._errorMessage) {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${errMessage}</p>
          </div>`;
    this._clearHTML();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._successMessage) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clearHTML();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;
    // this._parentElement.innerHTML = '';
    this._clearHTML();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
