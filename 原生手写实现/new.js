function myNew() {
    let obj = {};
    let constructor = arguments[0];
    obj.__proto__ = constructor.prototype;

    let args = [].slice.call(arguments, 1);

    let res = constructor.apply(obj, args);

    return typeof res === 'object' ? res : obj;
}

function foo() {}

let res = myNew(foo);
console.log('res: ', res);

