/*
 * Есть два типа кастомных элементов:
 * 1) Автономные - расширения HTMLElement;
 * 2) Модифицированные - расширения существующих элементов.
 * */

class MyDate extends HTMLElement {
  static unix_time = 'unix-time';

  // Не рендерить (операции с DOM) в конструкторе, т.к. ещё не определены методы
  // жизненного цикла и ленивость. Тут лучше создавать вложенные элементы,
  // объявлять переменные, вешать обработчики событий.
  constructor() {
    super();
    this.rendered = false;
    this.attachShadow({ mode: 'open' }); // => ShadowRoot
  }

  render() {
    const unixTime = +this.getAttribute(MyDate.unix_time);
    const date = new Date(unixTime);
    const unformattedMonth = date.getMonth() + 1;
    const [day, month, year] = [
      date.getDate(),
      (unformattedMonth < 10 ? '0' : '') + unformattedMonth,
      date.getFullYear(),
    ];
    const datetime = `${year}-${month}-${day}`;

    this.shadowRoot.innerHTML = `<time datetime="${datetime}">
      ${datetime}
    </time>`;
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
  // многократно добавляется/удаляется). Тут нужно удалять (this.removeChild)
  // всё содержимое.
  disconnectedCallback() {
    console.log('disconnectedCallback');
  }

  // Массив имён атрибутов для отслеживания их изменений.
  static get observedAttributes() {
    return [MyDate.unix_time];
  }

  // Изменение одного из перечисленных выше атрибутов.
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Атрибут "${name}": "${oldValue}" -> "${newValue}"`);
    this.render();
  }

  // Элемент перемещается в новый документ (происходит в document.adoptNode,
  // используется очень редко).
  adoptedCallback() {
    console.log('adoptedCallback');
  }
}

const elementName = 'my-date';
// Имя должно содержать дефис и не должно - "<" и ">".
customElements.define(elementName, MyDate);

/*
 * Неизвестные теги (в т.ч. и ещё не определённые через customElements.define)
 * не вызывают ошибок, но стилизуются через псевдокласс :not(:defined). А
 * после определения вызываются конструктор, connectedCallback и псевдокласс
 * :defined.
 * */

// Инфа о кастомных элементах:
customElements.get(elementName); // CustomElementConstructor (class MyDate
// extends HTMLTimeElement {...}) | undefined
customElements
  .whenDefined(elementName)
  .then((elementConstructor) => elementConstructor);

/*
 * Элементы обрабатываются друг за другом, родители до детей: <outer><inner>
 * </inner></outer> => сначала <outer>, затем <inner>. Т.о. this.innerHTML в
 * connectedCallback ничего не даст.
 *
 * Нет встроенного колбэка, который срабатывает после того, как вложенные
 * элементы готовы. Можно реализовать самостоятельно: внутренние элементы могут
 * отправлять события, а внешние могут слушать и реагировать на них.
 * */

/*
 * DOM-элемент может иметь 2 типа поддерева:
 * 1) Light tree - обычное;
 * 2) Shadow tree - скрытое DOM-поддерево, не отражённое в HTML. Все
 * идентификаторы, стили и т.п. могут быть уникальными и не влиять не внешние.
 *
 * Инкапсуляция:
 * 1) элементы Shadow DOM не видны из Light DOM (элементы Shadow DOM могут иметь
 * такие же идентификаторы, как у элементов Light DOM);
 * 2) у теневого DOM свои стили (внешние стили НЕ ПРИМЕНЯТСЯ).
 *
 * Если у элемента имеются оба поддерева, браузер отрисовывает только Shadow
 * tree, т.е. созданное через elem.attachShadow({ mode: ... })
 *
 * Ограничения:
 * 1) для элемента мы можем создать только один shadow-root;
 * 2) в качестве elem может быть использован кастомный элемент (extends
 * HTMLElement => this), либо один из некоторых тегов (например, <article>,
 * <aside>, <p>), но не, например, <img>.
 *
 * Значения mode (уровень инкапсуляции):
 * 1) 'open': доступ через elem.shadowRoot (ShadowRoot | null), который может
 * получить любой код;
 * 2) 'closed': доступ только через attachShadow, а elem.shadowRoot всегда
 * возвращает null.
 *
 * При условии, что { mode: 'open' } (иначе elem.shadowRoot равен null):
 * elem.shadowRoot.host - элемент с корнем теневого дерева.
 * */

/*
 * <template></template>
 *
 * Особенности:
 * * содержимым может быть любой корректный HTML-код (даже <tr>);
 * * браузер полностью игнорирует содержимое <template>, проверяя лишь
 * синтаксис, не выполняя код (даже, например, <script> или <video autoplay>);
 * * содержимое оживает (скрипты выполняются, <video autoplay> проигрывается,
 * ...), когда помещается в документ.
 * */

const div = document.createElement('div');
// Клонируем содержимое шаблона (content: DocumentFragment).
div.append(document.querySelector('#my-template').content.cloneNode(true));
document.body.appendChild(div);
