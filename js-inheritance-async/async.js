const log = (...args) => { console.log(...args) };

/**
 * АСИНХРОННОСТЬ
 * Call stack
 * Task queue: таски (коллбеки у setTimeout'ов и т.п.) выполняются по очереди только когда call stack и microtask 
 * queue пусты
 * Microtask queue: микротаски (всегда Promise)
 */

/**
 * TASK QUEUE
 * Асинхронных задания: setTimeout, setImmediate, setInterval, XMLHttpRequest и т.д.
 * Отдает задачи на определенном этапе Event Loop (после синхронных операций.
 * Очередь не обрабатывает таймауты и пр., только принимает задачи по их завершении.
 * Выполняется по одной задаче за цикл Event Loop/
 */
// Через 100 мс. функция ВЫЗОВЕТСЯ
setTimeout(() => { log('started after 100 msec.') }, 100);

/**
 * ПРОМИСЫ
 */

Promise.resolve('smthng');
// <=>
new Promise((resolve) => { resolve('smthng'); });

// Promise.reject(new Error('err'));
// <=>
// new Promise((_, reject) => { reject(new Error('err')); });

new Promise((resolve) => resolve('norm'))
    .then(
        result => { log(result) },
        error => log(error)
    );
// <=> но этот варик читабельнее
new Promise((resolve) => resolve('more readable'))
    .then(result => { log(result) })
    .catch(error => log(error));