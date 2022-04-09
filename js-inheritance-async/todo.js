*** ТИПЫ ДАННЫХ И ПОДНЯТИЕ ПЕРЕМЕННЫХ ***



* оператор typeof someInstance => 'typeName' (ведёт себя НЕОЧЕВИДНЫМ образом):
typeof 42 // 'number'
!!!
typeof null // 'object'
!!!

* примитивы:
boolean
string
number
symbol
null
undefined

* объекты:
Object
Array
Function
RegExp
Date
Error
и т. д.

* у примитивов можно вызвать методы объекта, являющегося их обёрткой:
'kek'.toUpperCase() // <=> (new String('kek')).toUpperCase()

* обёртка без new - функция для преобразования типов (с new всегда вызывается конструктор):
Number('123') // 123
String(123) // '123'

* var поднимает переменную до глобальной области видимости:
kek // undefined
var kek = 228
kek // 228
var kek = 32

* let и const игнорируют поднятие:
lol // ReferenceError
let lol = 228
let lol = 13 // SyntaxError



*** ПРЕОБРАЗОВАНИЕ ТИПОВ ***



* строка в число:
Number('   228 \n ') // 228
Number('') // 0
Number('28%') // NaN
parseInt('123%228') // 123
+'123' + +'456' === 579 // унарный +

* в строку:
!!!
если хотя бы один из ДВУХ операндов - строка, то второй будет также преобразован в строку
!!!
'1' + 2 === 1 + '2' // '12'



*** МАССИВЫ ***



* Создание:
arr = [1, 2, 3] // лучше

!!!
arr = new Array(n) // n * [undefined] <=> Array(n)
arr = new Array('1') // ['1']
arr = Array(1, 2) // [1, 2]
!!!

* Добавление элементов в массив:
1) arr.push('kek', 'lol', 'arbidol') // => новый length
2) arr.unshift('kek', 'lol', 'arbidol') // добавление в начало массива, => новый length
3) arr[i] = 'kek' // если до i-го индекса есть неинициализированные элементы, то они будут undefined, а length будет = i + 1
4) arr.length += n // +n undefined'ов

* Удаление элементов:
1) arr.pop() // length--, => удалённый элемент
2) arr.shift() // удаление из начала, length--, => удалённый элемент
2) delete arr[i] // <=> arr[i] = undefined, length не меняется

* Полезные функции:
arr.join('разделитель') // превращает все элементы массива в строки, объединяет их и возвращает получившуюся строку
arr.reverse()
arr.sort((a, b) => b - a) // => отсортированный массив, а если без компаратора, то сортируется через каст элементов в тип string (которые не кастятся, те перемещаются в конец)
arr.concat(anotherArr) // => новый массив = arr + anotherArr
arr.slice(i, j) // => подмассив элементами с индексами [i; j)



*** ДАТА ***



* Создание:
date = new Date() // В объект попадут текущие дата и время
date = new Date(миллисекунды) // Количество миллисекунд отсчитывая с 1 января 1970г
date = new Date(строкаДаты)
date = new Date(год, месяц, день[, часы, минуты, секунды, миллисекунды]) // месяц - от 0 до 11

* Полезные методы:
date.setFullYear(2017, 4, 22)
d.setDate(myDate.getDate() + 20) // +20 дней
// TODO



*** ИСКЛЮЧЕНИЯ ***



* Конструкция:
(
() => {
try {return 228; throw err}
catch(err) {err.getMessage()}
finally {console.log('finally')}
}
)()
// finally
// => 228

* throw err - err может быть любого типа
* Обычно бросают new Error(message) // err.message - сообщение



*** РЕГУЛЯРНЫЕ ВЫРАЖЕНИЯ ***



* Создание объекта RegExp:
regexp = /hello$/ // с помощью литерала
regexp = new RegExp('^Hello')
regexp = new RegExp('world!$', 'gui')

* Методы RegExp:
1) exec(text) // => массив из 1 элемента = подстроке соответствия (regexp.lastIndex при каждом вызове методы exec сместится на индекс символа в строке, который следует ПОСЛЕ конца соответствующей подстроки) или null, если нету
2) test(text) // проверка соответствия регулярному выражению, => true/false (с regexp.lastIndex аналогично)
!!!
Если совпадение не найдено, то lastIndex будет смещен на позицию 0 и поиск можно будет начинать сначала.
!!!

* Алфавитные и цифровые символы обозначают сами себя

* Методы String (если аргумент не RegExp, то он преобразуется к ней):
1) str.search(regexp) // => позиция/-1
Не поддерживает глобальный поиск и флаг "g" будет игнорирован.
2) str.replace(regexp, newSubstring) // => новая строка
Вместо newSubstring можно передать функцию.
3) str.match(regexp) // => массив
Если не передать флаг "g", то будет найдено только 1-е вхождение
4) str.split(regexp) // => массив
Пример: str.split(/\B/g) // разбить на массив из цифр


*** ПРОТОТИПЫ ***



!!!
this указывает на объект, находящийся СЛЕВА ОТ .
!!!

* SomeClass.prototype - ссылка на анонимный объект класса:
class A {}
class B extends A {}

A.prototype.constructor.name // "A"
A.prototype.func = () => {console.log("func");}
B.prototype.__proto__ // A
B.prototype.__proto__.__proto__ // Object

a = new A();
a.__proto__.constructor.name // "A"

* SomeClass.func = () => {...} - СТАТИЧЕСКАЯ функция!!!

* Свойства объекта
a.field = '123'
a.kek = (a) => a + 1
delete a.kek // удаление свойства



*** call, bind, apply ***



* bind(context, ...funcArgs) нужен для привязки контекста к функции (ОБЯЗАТЕЛЬНО использовать в callback'ах), возвращает
функцию:
const Dima = {name: 'Dima'};

function meet(age) {
    console.log(`Hi, my name is ${this.name}, I'm ${age}`);
}

meet.bind(Dima)(21); // <=> meet.bind(Dima, 21)

* call - тоже самое, только вызывает ф-ю сразу
* apply = call, только вместо varargs массив параметров



*** ЗАМЫКАНИЯ И ОБЪЯВЛЕНИЯ ФУНКЦИЙ ***



* неуказанный параметр при вызове функции = undefined:
function kek(a, b) {console.log(a, b)}
kek(1) // 1 undefined

* функц. объявление:
func() // норм
function func() {}

* функц. выражение:
expr() // TypeError
var expr = function () {}

* замыкание:
sum_with = (a) => (b) => a + b;
/*
замкнутость переменной a в функции, которую возвращает sum_with <=> функция, которую возвращает sum_with, замкнула в себе переменную a
так работает, т. к. ф-я (b) => a + b; вызывается в контексте sum_with
*/
const sum_with_2 = sum_with(2)
sum_with_2(3) // 5



*** ГЕНЕРАТОР ***



function* get_elems(arr) {
    for(let i = 0; i < arr.length; ++i) {
        yield arr[i]
    }
}
...
const elem = get_elems(['a', 'b'])
elem.next() // {value: 'a', done: false}
elem.next() // {value: 'b', done: false}
elem.next() // {value: undefined, done: true}



*** ЦИКЛЫ + HOF МАССИВОВ ***



* в обычных for'ах можно использовать continue, break

* for...of (по значению):
for (let [key, value] of Map([['a', 1], ['b', 2], ['c', 3]])) {
    console.log(value);
}

* for...in (по перечисляемым свойствам объекта + прототипа в произвольном порядке => НЕ ИСПОЛЬЗОВАТЬ):
for (let key in person) {
    if (person.hasOwnProperty(key)) { ваш код ... key }
}

* методы массивов (не изменяют исходный массив)
1) arr.forEach((currentValue, index, array) => {...})
2) Arr = arr.map((currentValue, index, array) => {...})
3) Arr = arr.filter((elem) => ((elem === 228) ? elem : null))
4) sum = arr.reduce((total, elem) => total + elem, 0) // 2-ой аргумент - начальное значение
5) elem = arr.find(elem => elem === 228)
6) elemIndex = arr.findIndex(elem => elem === 228) // 0..length - 1



*** ДЕСТРУКТУРИЗАЦИЯ ***



* для массивов:
function calc(a, b) {
    return [
        a + b,
        a - b,
        a * b,
        a / b
    ];
}

let [sum, sub, , div] = calc(2, 3); // a * b пропускается
let [sum, sub, mul, div, undef] = calc(4, 2); // 6, 2, 8, 2, undefined
let [sum, sub, ...others] = calc(2, 3); // others == [6, 0.6666666666666666]

function getUndefined() {
    return [undefined];
}

let [kek = 'не определено'] = getUndefined(); // kek == 'не определено'

* для объектов:
// ДОДЕЛАТЬ



*** РАЗНОЕ ***



* контекст - область памяти, из которой доступны данные
* все классы неявно наследуются от глобального класса Object
* #instance - приватное поле (работает не во всех браузерах), может быть и другие неприватные поля с именами instance

* группировка содержимого:
console.group('caption')
console.log('content')
console.groupEnd()