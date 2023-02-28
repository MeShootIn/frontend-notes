/*
 * Для расширения встроенных тегов необходимо:
 * 1) унаследоваться от соответствующего класса (HTMLButtonElement);
 * 2) указать тег в поле extends ('button'), т.к. иногда разные теги имеют
 * одинаковый DOM-класс;
 * 3) в элементе указать атрибут is (is='my-button').
 * */
class MyButton extends HTMLButtonElement {
  constructor() {
    super();
    this.addEventListener('click', () => {
      console.log('Привет!');
    });
  }
}

customElements.define('my-button', MyButton, { extends: 'button' });
