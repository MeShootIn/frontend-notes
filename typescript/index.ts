/**
 * Tuple (кортежи)
 *
 * Это упорядоченная структура данных с конкретными типами.
 */
function Tuple() {
  let tuple: [string, number, object];

  tuple = ['a', 2, {name: 'Dima'}];
  // tuple = [[], {name: 'Dima'}, 'asd']; // Ошибки
  console.log(tuple[2]);
}

/**
 * Enum
 *
 * Если уж задавать кастомные значения, то задавать все. И лучше уникальные.
 * Лучше enum использовать только если нет альтернативы.
 */
function Enum() {
  enum Something {
    Zero,
    One,
    SomeString = 'Dima',
    ThursdaySerialNumber = 1, // Новая точка отсчёта
    Four, // Затем автоматически 2
    FiveOverridden = 5, // Опять начинаем отсчёт с другого числа
    Six, // И т. д.
    // And = ['so', 'on'] // Computed values are not permitted in an enum with string valued members.
  }

  console.log(typeof Something, typeof Something.SomeString, typeof Something.One); // object string number
  console.log({...Something}); // {'0': 'Zero', ..., '6': 'Six', Zero: 0, ..., Six: 6}

  // Reversed Enum
  // !!! Берёт последний подходящий ключ (One = 1, ThursdaySerialNumber = 1 - его) !!!
  const ThursdaySerialNumber: string = Something[1];
  console.log(typeof ThursdaySerialNumber, ThursdaySerialNumber); // string, ThursdaySerialNumber

  // !!! Автоматически выбирается тип (ожидали Array<object>, а выдало number) !!!
  const num: Array<object> = Something[ThursdaySerialNumber];
  console.log(typeof num, num); // number 1

  // Безопасное взятие по индексами
  console.log(Something[-1], Something[123], Something['someIndex']); // undefined, undefined, undefined
}

/**
 * Any, Unknown, Null, Never
 *
 * Any - любой тип в runtime. Unknown - тоже, но не конвертится в другие. Значит,
 * лучше юзать unknown, особенно при запрашивании с сервака неизвестных данных.
 */
function TypeScriptTypes() {
  // Unknown
  let notShure: unknown = 123;
  notShure = 'теперь строка';
  notShure = false;

  const UnknownValue: unknown = 'строка';
  // const strFromUnknown: string = UnknownValue; // Type 'unknown' is not
  // assignable to type 'string'.

  const AnyValue: any = 'опять строка';
  const strFromAny: string = AnyValue; // Норм (что не есть хорошо)

  // Void
  function JustVoid(): void {
    console.log('nothing special...');
  }

  console.log(typeof JustVoid, JustVoid()); // function, undefined

  let canBeUndefinedOrNull: void = undefined;
  canBeUndefinedOrNull = null;

  // Лучше включать 'strictNullCheck' (для 'null-safety'). Выключен (плохо) =>
  // не будет ошибки:
  const num: number = null;
  const str: string = null;

  // Never
  function alwaysThrowsError(): never {
    throw new Error('never');
  }

  function willNeverEnd(): never {
    while (true) {
    }
  }

  function auto() {
    return new Error('auto');
  }

  console.log(typeof auto()); // object

  // Не использовать Object, т. к. это Any "на минималках"
}

/**
 * Type Assertion - явное приведение типов.
 */
function TypeAssertion() {
  // Современный вариант
  const UnknownString: unknown = 'str';
  const len = (UnknownString as string).length;

  // Старый стиль => не юзать
  const UnknownString2: unknown = 'str';
  const len2 = (<string>UnknownString2).length;
}

/**
 * TypeInterface
 *
 * В общем, лучше юзать type, но есть различия. Ключевые:
 * 1) Intersection types: FirstType & SecondType / extends
 * 2) Возможность повторного определения для interface.
 */

// Intersection types
type Person = {
  name: string
}

type Employee = Person & {
  job: string
}

function TypeInterface() {
  function acceptPersons(person: Person) {
    console.log(`Still a person with a name ${person.name}`);
  }

  const Dima: Employee = {
    name: 'Dima',
    job: 'no matter...'
  };

  acceptPersons(Dima);

  // Повторное определение
  interface Window {
    width: number
  }

  interface Window {
    height: number
  }

  // А для type Window была бы ошибка
  console.log({width: 1366, height: 768} as Window);

  // Duck-typing (утиная типизация)
  type User = {
    name: string
  };

  type AlmostUser = {
    name?: string,
    age: number
  }

  function acceptUsers(user: User) {
    console.log(`Hi, ${user.name}!`);
  }

  // notAUser - реализация "надтипа" User, т. о. notAUser is assignable to type 'User'
  const notAUser = {
    name: 'Somebody',
    kek: 'told me'
  };

  // Всё норм => !!! Тип переменной !== тип значения !!!
  acceptUsers(notAUser);
  // Тут будет ошибка: Argument of type 'AlmostUser' is not assignable to parameter of type 'User'
  // acceptUsers({age: 123} as AlmostUser);
}

/**
 * Utility Types
 *
 * Основные:
 * Partial<Type> - делает все поля опциональными.
 * Required<Type> - обратный к Partial.
 * Readonly<Type> - все поля readonly.
 * Record<Keys, Type> - аналог Map.
 * Pick<Type, Keys> - берёт конкретные ключи (Keys) у Type.
 * Omit<Type, Keys> - обратный к Pick.
 * Exclude<UnionType, ExcludedMembers> - тот же Omit, но для Union Type'ов.
 * ReturnType<Type> - возвращает тип, возвращаемый Type.
 */
function UtilityTypes() {
  // Partial
  interface Todo {
    title: string,
    description: string,
    isDone: boolean
  }

  function updateTodo(todo: Todo, fields: Partial<Todo>) {
    return {...todo, ...fields};
  }

  let trash: Todo = {
    title: 'Trash',
    description: 'throw out trash',
    isDone: false
  };
  trash = updateTodo(trash, {isDone: true});

  console.log(typeof trash, trash); // object { title: 'Throw out trash', isDone: true }

  // Pick
  // Да, type можно наследовать от interface, т. к. под капотом это Object
  type TodoPreview = Pick<Todo, 'title' | 'isDone'>;

  const trashPreview: TodoPreview = {
    title: 'Trash (preview)',
    isDone: false
  };

  // ReturnType
  type StringType = ReturnType<() => string>;
  let stringType: StringType = 'stringType is type of string';

  console.log(typeof stringType); // string

  type GenericType = ReturnType<<T>() => T>;
  let genericType: GenericType = 'genericType is type of unknown';

  console.log(typeof genericType); // unknown
}

/**
 * Перегрузка функций
 */
function FunctionOverride() {
  type Point = {
    x: number,
    y: number
  };

  type Vector = Point;

  function create(): Point;
  function create(v: Point): Vector;
  function create(a: Point, b: Point): Vector;

  function create(a?: Point, b?: Point) {
    if (!a && !b) {
      return {
        x: 0,
        y: 0
      };
    }

    if (a && !b) {
      return {
        x: a.x,
        y: a.y
      };
    }

    return {
      x: b.x - a.x,
      y: b.y - a.y
    };
  }

  console.log(create())
  console.log(create({x: 1, y: 2}))
  console.log(create({x: 1, y: 2}, {x: 3, y: 4}))
}

/**
 * Операторы
 *
 * keyof - возвращает Union Type из ключей объекта.
 */
function Operators() {
  type EmployeeKeys = keyof Employee;
  const nameKey: EmployeeKeys = 'name';
}

// Tuple();
// Enum();
// TypeScriptTypes();
// TypeAssertion();
// TypeInterface();
// UtilityTypes();
// FunctionOverride();