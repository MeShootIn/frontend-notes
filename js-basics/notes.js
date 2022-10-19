const { log } = require('./helpers');


// TODO Chrome Dev Tools
/* ПЕРЕМЕННЫЕ И ТИПИЗАЦИЯ */
/*
 * JS - слабо типизированный язык:
 * * не нужно определять тип переменной, он будет выведен автоматически на
 основании присвоенного значения;
 * * можно использовать одну переменную для хранения данных различных типов;
 * * при выполнении операций данные автоматически приводятся к одному типу.
 *
 * Значение примитивного типа:
 * * не объект;
 * * не имеет методов;
 * * иммутабельно - не может быть изменено in-place.
 * */

/* VAR */
/*
 * Можно объявлять несколько раз.
 *
 * Хойстинг переменной - когда её объявление "поднимается" в начало функции /
 * области видимости.
 *
 * Область видимости var:
 * * функция => хойстинг;
 * * глобальная область => хойстинг + добавляется в window (window.someVar) =>
 становится глобальной.
 * */

/* CONST */
/*
 * Нельзя объявить без значения.
 * Нельзя переприсваивать.
 * */

let bar = 'baz';
// Использование метода строки не мутирует эту строку, т.к. фактически
// выполнится: new String(bar).toUpperCase()
bar.toUpperCase();
log(bar); // baz
bar = bar.toUpperCase();
log(bar); // BAZ

/*
 * 7 примитивов:
 * * Undefined ( undefined )
 * * Boolean ( true, false )
 * * Number ( 123.456, 0xFF, 0b11, 6.4e32 )
 * * String ( 'some string' )
 * * BigInt ( 1924924124n )
 * * Symbol ( Symbol() )
 * * Null ( null )
 * */
typeof undefined === 'undefined';
typeof true === 'boolean';
// ...
typeof Symbol() === 'symbol'; // Должен создаваться без new
// Но для null:
typeof null === 'object'; // Т.к. Object.prototype.__proto__ === null
/*
 * 1 непримитив:
 * * Object (ссылочный тип)
 *
 * Функция (Function) - особый, вызываемый объект. Сделан, чтобы понять, что
 * данный объект можно вызывать:
 * */
typeof ( () => {} ) === 'function';
/*
 * Для экземпляров встроенных объектов (обёрток) Array, Function, RegExp, Date,
 * Error, String, Number, Boolean и др. typeof вернет 'object'.
 * Для экземпляров вместо оператора typeof используется instanceof - проверка
 * наследования =>
 * */
// => если класс отнаследован от какого-либо, то его экземпляры являются
// наследниками последнего =>
log( [] instanceof Array && [] instanceof Object ); // true, т. к. Object -
// прототип Array, т. к. [].__proto__.__proto__.constructor.name === 'Object'
log( [].constructor.name === [].__proto__.constructor.name ); // true

/* ОБЁРТКИ НАД ПРИМИТИВАМИ */
/*
 * Т.к. это объекты, то не надо проводить те же действия, что и с оборачиваемыми
 * примитивами.
 * Обёртка без new - это функция для преобразования типа.
 * */
log( (new Boolean(false)) ? 'истина' : 'увы' );

/* ЗАЩИЩЁННЫЙ КОНСТРУКТОР */
/*
 * Паттерн убирает разницу между вызовом конструктора с new и без.
 * Большинство конструкторов встроенных объектов можно (плохой тон) спокойно без
 * new (кроме Date).
 * */
typeof Date(); // 'string' (строковое представление текущей даты)
typeof new Date(); // 'object'

/* UNDEFINED */
/*
 * Значение undefined автоматически присваивается переменным, которые были
 * объявлены без присвоения, или аргументам функции, для которых не были переданы
 * значения.
 * */
if (typeof neverDeclared === 'undefined') { } // OK
// if (neverDeclared === undefined) { } // ReferenceError

/* NULL */
/*
 * null обозначает отсутствие значения у переменной; в отличие от undefined
 * никогда не присваивается автоматически.
 * null - последнее звено в цепочке прототипов, то есть от null унаследованы все
 * остальные объекты.
 * */
Object.prototype.__proto__; // null
// Именно поэтому:
typeof null === 'object'; // true

/* STRING */
/*
 * Кавычки:
 * * '' - предпочтительный способ для простых строк;
 * * "" - работают escape-последовательности;
 * * `` - всё отображается так же, как и в коде.
 *
 * Поддерживается Unicode.
 * */
log('\u{1F602}'); // 😂

/* ШАБЛОННЫЕ СТРОКИ */
// Вставка значений в строку
const Chewbacca = 'Чубакка';
const str = `До свидания, ${Chewbacca}. Скучать без вас я
        буду.`;
log(str);
// Перенос строк без спец. символов
`
― Нужно спрятать этих детей, беречь.
― Увезем их туда, где ситхам не учуять их
присутствие.
― Разделить их следует.
`

/* NUMBER */
/*
 * Number - числовой тип данных в формате 64-битного числа двойной точности с
 * плавающей запятой.
 * Безопасный диапазон: [ -(2^53-1), (2^53-1) ].
 * 0x... - hexadecimal (16-ричное), 0o... - octal (8-ричное), 0b... - binary
 * (2-ичное)), 12e+3 - exponential.
 * Infinity - любое число ЗА ПРЕДЕЛАМИ 64-битного диапазона => при / 0 нет
 * ошибки.
 * */
log( 5 / Infinity ); // 0
log( -5 / Infinity ); // -0 (из-за следования стандарту IEEE 754)
typeof NaN; // number
NaN == NaN; // false
Number.isNaN(Infinity % 5); // true
// TODO Методы объекта Number https://youtu.be/6j-Rroa_dq0?list=PLp8YG0BfOLkzPrWNOewRWgS1rwmTSLf5M&t=2679
Math.trunc(3); // trunc отбрасывает дробную часть
// TODO Преобразование строки в число:
// https://youtu.be/6j-Rroa_dq0?list=PLp8YG0BfOLkzPrWNOewRWgS1rwmTSLf5M&t=2795
// https://youtu.be/tAgVINdc_o0?list=PLlv4KV8fRplzgUppnnh9FsrQtXSnFaasL&t=658

/* ПОТЕРЯ ТОЧНОСТИ */
const sum = 0.1 + 0.2; // 0.30000000000000004

sum === 0.3; // false
Math.abs(sum - 0.3) < Number.EPSYLON; // true
+sum.toFixed(10) === 0.3; // true

/* BIGINT */
/*
 * Большое целое число. Добавлен в ES2020. Диапозон зависит от конкретной
 * реализации.
 *
 * Ограничения:
 * * нельзя оперировать с Number, но можно сравнивать;
 * * нельзя юзать с Math и многими другими встроенными функциями/объектами.
 * */
42n !== 42;
// 1 + 1n; // TypeError
5n / 2n === 2n;

/* SYMBOL */
/*
 * Уникальный и неизменяемый тип данных, который обычно используется как
 * идентификатор для свойств объектов для предотвращения коллизий имён и
 * затирания. Добавлен в ES6.
 *
 * Особенности:
 * * не перечисляется в for..in;
 * * нет в Object.keys() и Object.getOwnPropertyNames();
 * * есть в Object.getOwnPropertySymbols().
 * */

/* МАССИВЫ */
/*
 * Встроенный объект для работы с упорядоченным набором элементов.
 * Свойство length:
 * * = последний индекс + 1;
 * * при уменьшении (увеличении) вручную укорачиывает (удлиняет) массив
 * (присваивая новым элементам undefined).
 * */
const literals = [1, 2, 3]; // Рекомендуемый способ
const multipleArgs = new Array(1, 2, 3); // => [1, 2, 3] (нерекомендуемый способ)
const byLength = new Array(2); // [undefined, undefined] (нерекомендуемый способ)

/* РЕГУЛЯРНЫЕ ВЫРАЖЕНИЯ */
/*
 * Регулярные выражения - шаблоны для сопоставления последовательностей символов
 * в строках.
 * */
// Использование литерала удобно для неизменяемых выражений. Компилируется при
// анализе скрипта.
const regExpConst = /\d/g; // 1 число
// Создаение через конструктор удобно для дополняемых выражений. Компилируется в
// рантайме.
const regExp = new RegExp('/^.{10,}/g'); // Длина не менее 10

/* ПРЕОБРАЗОВАНИЕ ТИПОВ */
/*
 * Преобразуются в false:
 * * undefined, null
 * * 0
 * * NaN
 * * ''
 *
 * Преобразуются в true:
 * * объекты
 * * числа, кроме 0
 * * Symbol
 * * непустые строки
 * */

/* ВЫРАЖЕНИЯ И ОПЕРАТОРЫ */
/*
 * Характеристики операторов:
 * * количество операндов: 1, 2 или 3;
 * * ассоциативность: левая ( + ) или правая ( a = b = c );
 * * приоритет: [1, 20]
 * */
// TODO https://youtu.be/6j-Rroa_dq0?list=PLp8YG0BfOLkzPrWNOewRWgS1rwmTSLf5M&t=4070
// Правая ассоциативность для оператора "="
let x = 1;
let y = x *= 5;
log(x); // 5
log(y); // 5

/* РЕЛЯЦИОННЫЕ ОПЕРАТОРЫ */
/*
 * Порядок выполнениния сравнения:
 * 1) Объекты конвертятся в примитивы с хинтом (желаемый тип) 'number' через
 * метод Symbol.toPrimitive;
 * 2) Если оба значения - строки, то сравниваются по правилам строк;
 * 3) Иначе, приводятся в number:
 * * false, null -> 0
 * * true -> 1
 * * undefined -> NaN
 * * string -> конвертация строки в число
 * 4) Если одно из значений === NaN, то вернётся false, либо сравниваются числа.
 * */

/* IN И INSTANCEOF */
/*
 * Оператор in возвращает true, если СВОЙСТВО содержится в объекте (для
 * примитивов => исключение) или в цепочке прототипов.
 * */
const arrIn = ['string', 123, { key: 'value' }];
'string' in arrIn; // false
2 in arrIn; // true
'length' in arrIn; // true
'PI' in Math; // true
/*
 * someObj instanceof SomeClass === true <=> SomeClass.prototype есть в цепочке
 * прототипов someObj.
 * */
'primitive' instanceof String; // false
new String('object') instanceof String; // true
new String('object') instanceof Object; // true

/* ПОБИТОВОЕ СРАВНЕНИЕ */
/*
 * TODO https://youtu.be/6j-Rroa_dq0?list=PLp8YG0BfOLkzPrWNOewRWgS1rwmTSLf5M&t=4453
 * */

/* ЛОГИЧЕСКИЕ ОПЕРАТОРЫ */
/*
 * TODO
 * */

// && вернёт 1-ый операнд, если он == false, иначе 2-ой.
'' && 'foo'; // ''
2 && 0; // 0
'foo' && 4; // 4

// || вернёт 1-ый операнд, если он == true, иначе 2-ой.
'' || 'foo'; // 'foo'
2 || 0; // 2
'foo' || 4; // 'foo'

// Оператор нулевого слияния ?? вернёт 2-ой операнд, если 1-ый === null или ===
// undefined, иначе 1-ый.
'' ?? 'foo'; // ''
undefined ?? 0; // 0
null ?? 4; // 4
// TODO https://youtu.be/6j-Rroa_dq0?list=PLp8YG0BfOLkzPrWNOewRWgS1rwmTSLf5M&t=5118

// Оператор опциональной последовательности ? возвращает значение свойства на
// любом уровне вложенности (без проверки каждого на существование).
// Поддерживается с ES2020.
// Общий вид:
// * obj?.prop
// * obj?.[expr]
// * arr?.[index]
// * func?.(args)
const adventurer = {
  name: 'Alice',
  cat: {
    name: 'Dinah',
  },
};
adventurer.dog?.name === undefined;
adventurer.someNonExistentMethod?.() === undefined;
// adventurer.cat?.(); // TypeError (значение существует, но это не функция)

/* TRY-CATCH-FINALLY */
/*
 * TODO https://youtu.be/6j-Rroa_dq0?list=PLp8YG0BfOLkzPrWNOewRWgS1rwmTSLf5M&t=5311
 * */

/* SWITCH-CASE */
/*
 * Выражение в switch(expr) вычисляется только 1 раз.
 * */

// Fall through: текущий case без break сразу же перейдёт к следующему БЕЗ
// ПРОВЕРКИ на соответствие case.
log();
const second = 'second';

switch (second) {
  case 'first': {
    log(1);
  }

  case 'second': {
    log(2);
  }

  case 'third':
    log(3);

  default: {
    log('default');
  }
} // 2 3 default

// Комбинирование case'ов: как || логическое.
switch (second) {
  case 'first':
  case 'second': {
    log('first or second');
    break;
  }

  case 'third': {
    log(3);
    break;
  }
}

/* ФУНКЦИИ И ОБЛАСТЬ ВИДИМОСТИ */
/*
 * Если функция ничего не вернула явно, то возвращается undefined.
 * Непереданным параметрам присваивается undefined.
 * До ES6 (когда был только var) область видимости создавалась через function,
 * т.о. юзался паттерн IIFE.
 * Замыкание - комбинация функции и её области видимости.
 *
 * Есть Динамическая (где функция вызвана (НЕ РАБОТАЕТ В JS)) и Лексическая (где
 * функция объявлена (работает в JS)) области видимости.
 * */

// Паттерн IIFE (Immediately Invoked Function Expression)
(function () {
  var value = 123;
})();
// log(value); // ReferenceError: value in not define

// Можно вызывать до объявления (хойстинг)
function simpleFunction() {
}
// Нельзя вызывать до объявления
const functionExpresson = function () {
};
// Нельзя вызывать до объявления + запоминает this
const arrowFunction = () => {
};
// Плохой тон + есть неприятные особенности
const functionConstructor = new Function('a', 'b', 'return a + b');

const outer = 'global';

// Функция в момент ОБЪЯВЛЕНИЯ захватывает текущий контекст (в т.ч. outer)
function getOuter() {
  return outer;
}

function printOuter() {
  const outer = 'inner';

  log(getOuter());
}

log();
printOuter(); // global

// Паттерн Module
var dbModule = (function (credits) {
  var privateValue = 'https://www.elephantsql.com';

  function privateMethod() {
  }

  function publicMethod() {
  }

  return {
    run: publicMethod,
  };
})({login: 'admin', password: 'qwerty123'});
dbModule.run();

/* КОНТЕКСТ */
/*
 * TODO https://youtu.be/tAgVINdc_o0?list=PLlv4KV8fRplzgUppnnh9FsrQtXSnFaasL&t=2267
 * */

/* ПОИСК В DOM */
/*
 * Если не переобъявлена локально, то есть глобальная переменная с именем,
 * указанным в id:
 * ... <div id="elem"> ...
 * elem - ссылка на элемент с id="elem": elem.style.background = 'red';
 *
 * Метод elem.matches(selector) проверяет, удовлетворяет ли элемент селектору.
 *
 * Метод elem.closest(selector) ищет ближайшего предка, соответствующего
 * селектору. Сам elem также включается в поиск.
 *
 * Метод elemA.contains(elemB) вернёт true, если elemB находится внутри elemA
 * (elemB потомок elemA) или когда elemA == elemB.
 * */