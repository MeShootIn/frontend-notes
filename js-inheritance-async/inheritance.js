const log = (...args) => { console.log(...args) };

/**
 * ГЛОБАЛЬНЫЙ ОБЪЕКТ
 */

/**
 * В любой среде выполнения JS есть ГО. Примеры:
 * * Браузер - window
 * * Node - global
 * * ServiceWorker'ы - self
 * 
 * function и var привязываются к ГО.
 */

/**
 * ПРОТОТИПНОЕ НАСЛЕДОВАНИЕ
 */

/**
 * Функция-конструктор - нестрелочная функция, вызываемая через new.
 * Оператор new:
 * 1) Создаёт новый экземпляр.
 * 2) Копирует ссылку на prototype в прототип экземпляра.
 * 3) Вызывает конструктор в контексте этого экземпляра.
 * 4) Возвращает экземпляр.
 */
function Person(name) {
    this.name = name;
    // Для каждого экземпляра создаётся отдельная функция, но с тем же функционалом!!! => лишние затраты памяти
    // this.growl = function() {
    //     console.log(`${this.name} рычит!`);
    // }
}

// Правильный вариант
Person.prototype.growl = function () {
    log(`${this.name} рычит!`);
}

// Статический метод
Person.say() = function () {
    log(`I'm a Person!`);
}

const dima = new Person('Dima');
dima.growl();

/**
 * Цепочка прототипов: Andrey, Ivan {name: ...} -> Person.prototype {growl() {...}} -> Object.prototype {...} -> null.
 * У каждого экземпляра хранится ссылка на prototype (единожды отдельно созданный объект, куда записывают общие поля).
 * У prototype тоже есть свойство __proto__.
 */
log(Object.prototype.__proto__ === null);
log(dima.__proto__ === Person.prototype);
log(dima.__proto__.__proto__ === Person.prototype.__proto__ && Person.prototype.__proto__ === Object.prototype);

// Создание объекта с прототипом
const employee = Object.create(Person);
// Создание объекта без прототипа => недоступно по умолчанию всё то, что есть в Object
const something = Object.create(null);