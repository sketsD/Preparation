class SearchView {
  #pareneElement = document.querySelector('.search');

  getQurery() {
    const query = this.#pareneElement.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  //   addHandlerRender(callback) {
  //     this.#pareneElement.addEventListener(
  //       'submit',
  //       function (e) {
  //         e.preventDefault();
  //         callback();
  //         this.#clearInput();
  //       }.bind(this)
  //     );
  //   }

  addHandlerRender(callback) {
    this.#pareneElement.addEventListener('submit', e => {
      e.preventDefault();
      callback();
    });
  }
  #clearInput() {
    this.#pareneElement.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
