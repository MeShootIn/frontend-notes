const UNIX_TIME = 'unix-time';

class MyDate extends HTMLElement {
  // Не рендерить в конструкторе, т.к. ещё не определены методы жизненного
  // цикла и ленивость.
  constructor() {
    super();
    this.rendered = false;
  }

  // Добавление элемента в документ (может вызываться много раз, если элемент
  // многократно добавляется/удаляется).
  connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }

  // Удаление элемента из документа (может вызываться много раз, если элемент
  // многократно добавляется/удаляется).
  disconnectedCallback() {
    console.log('disconnectedCallback');
  }

  // Массив имён атрибутов для отслеживания их изменений.
  static get observedAttributes() {
    return [UNIX_TIME];
  }

  // Изменение одного из перечисленных выше атрибутов.
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Атрибут "${name}": "${oldValue}"->"${newValue}"`);
    this.render();
  }

  // Элемент перемещается в новый документ (происходит в `document.adoptNode`,
  // используется очень редко).
  adoptedCallback() {
    console.log('adoptedCallback');
  }

  render() {
    const unixTime = +this.getAttribute(UNIX_TIME);
    const date = new Date(unixTime);
    const unformattedMonth = date.getMonth() + 1;
    const [day, month, year] = [
      date.getDate(),
      (unformattedMonth < 10 ? '0' : '') + unformattedMonth,
      date.getFullYear(),
    ];
    const datetime = `${year}-${month}-${day}`;

    this.innerHTML = `<time datetime="${datetime}">${datetime}</time>`;
  }
}

const elementName = 'my-date';
// Строка имени должна содержать дефис и не должна - "<" и ">".
customElements.define(elementName, MyDate);

/*
 * Неизвестные теги (в т.ч. и ещё не определённые через `customElements.define`)
 * не вызывают ошибок, но стилизуются через псевдокласс `:not(:defined)`. А
 * после определения вызываются конструктор, `connectedCallback` и псевдокласс
 * `:defined`.
 * */

// Инфа о кастомных элементах:
customElements.get(elementName); // CustomElementConstructor (class MyDate
// extends HTMLElement {...) | undefined
customElements
  .whenDefined(elementName)
  .then((elementConstructor) => elementConstructor);
