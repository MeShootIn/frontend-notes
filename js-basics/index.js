const { log } = require('./helpers');

function debug(SomeClass) {
    log(SomeClass);

    const someInstance = new SomeClass();

    log(SomeClass.prototype);
    log(someInstance.__proto__);

    // log(typeof SomeClass); // function
    // log(typeof someInstance); // object
    log(someInstance instanceof Object); // true

    log();
}

// class A { };
// debug(A);

log(typeof []);
log(typeof Array);

const a = '';
log(a instanceof Object);

// debug(Array);
// debug(Date);
// debug(String);
// debug(Number);
// debug(Boolean);
// debug(Map);
// debug(Set);