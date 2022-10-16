const { log } = require('./helpers');


// TODO Chrome Dev Tools
/*
ПЕРЕМЕННЫЕ И ТИПИЗАЦИЯ
*/
/*
 * JS - слабо типизированный язык:
 ** не нужно определять тип переменной, он будет выведен автоматически на
 основании присвоенного значения;
 ** можно использовать одну переменную для хранения данных различных типов;
 ** при выполнении операций данные автоматически приводятся к одному типу.

 * Значение примитивного типа:
 ** не объект;
 ** не имеет методов;
 ** иммутабельно - не может быть изменено in-place.
 */

/* VAR */
/*
 * Можно объявлять несколько раз.

 * Хойстинг переменной - когда её объявление "поднимается" в начало функции /
 * области видимости.

 * Область видимости var:
 ** функция => хойстинг;
 ** глобальная область => хойстинг + добавляется в window (window.someVar) =>
 становится глобальной.
 */

/* CONST */
/*
 * Нельзя объявить без значения.
 * Нельзя переприсваивать.
 */

let bar = 'baz';
// Использование метода строки не мутирует эту строку, т.к. фактически
// выполнится: new String(bar).toUpperCase()
bar.toUpperCase();
log(bar); // baz
bar = bar.toUpperCase();
log(bar); // BAZ

/*
 * 7 примитивов:
 ** Undefined ( undefined )
 ** Boolean ( true, false )
 ** Number ( 123.456, 0xFF, 0b11, 6.4e32 )
 ** String ( 'some string' )
 ** BigInt ( 1924924124n )
 ** Symbol ( Symbol() )
 ** Null (null)
 */
typeof undefined === 'undefined';
typeof true === 'boolean';
// ...
typeof Symbol() === 'symbol'; // Должен создаваться без "new"
// Но для null:
typeof null === 'object'; // Т.к. Object.prototype.__proto__ === null
/*
 * 1 непримитив:
 ** Object

 * Функция (Function) - особый, вызываемый объект. Сделан, чтобы понять, что
 * данный объект можно вызывать:
 */
typeof ( () => {} ) === 'function';
/*
 * Для экземпляров встроенных объектов Array, Date, String, Number, Boolean и
 * др. typeof вернет 'object'.
 * Для экземпляров вместо оператора typeof используется instanceof - проверка
 * наследования =>
 */
// => если класс отнаследован от какого-либо, то его экземпляры являются
// наследниками последнего =>
log([] instanceof Array && [] instanceof Object); // true, т. к. Object -
// прототип Array, т. к. [].__proto__.__proto__.constructor.name === 'Object'
log([].constructor.name === [].__proto__.constructor.name); // true

/* UNDEFINED */
/*
 * Значение undefined автоматически присваивается переменным, которые были
 * объявлены без присвоения или аргументам функции, для которых не были переданы
 * значения.
 */
if (typeof neverDeclared === 'undefined') { } // OK
// if (neverDeclared === undefined) { } // ReferenceError

/* NULL */
/*
 * null обозначает отсутствие значения у переменной; в отличие от undefined
 * никогда не присваивается автоматически.
 * null - последнее звено в цепочке прототипов, то есть от null унаследованы все
 * остальные объекты.
 */
Object.prototype.__proto__; // null
// Именно поэтому:
typeof null === 'object'; // true

/* STRING */
/*
 * Кавычки:
 ** '' - предпочтительный способ для простых строк;
 ** "" - работают escape-последовательности;
 ** `` - всё отображается так же, как и в коде.

 * Поддерживается Unicode.
 */
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
 */
log( 5 / Infinity ); // 0
log( -5 / Infinity ); // -0 (из-за следования стандарту IEEE 754)
typeof NaN; // number
NaN == NaN; // false
Number.isNaN(Infinity % 5); // true
// TODO Методы объекта Number 45:22
Math.trunc(3); // trunc отбрасывает дробную часть
// TODO INFO Преобразование строки в число 46:34