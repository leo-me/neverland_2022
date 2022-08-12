function curry(fn, ...args) {
    if(args.length >= fn.length) {
        return fn(...args);
    }

    return function(...args1) {
        return curry(fn, ...args, ...args1);
    }
}

function add(x, y) {
    return x + y;
  }

  let t = curry(add, 2);

  console.log('s: ', t(19), t(2), curry(add, 2)(5));
