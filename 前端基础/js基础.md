# 类型，涉及以下：
- 类型种类
- 判断
- 转换
- 深度拷贝


# 闭包，涉及以下：
- 作用域
- v8 垃圾回收
- 变量提升


# 异步，涉及以下：

- Promsie 的历史，用法


- 简单手写 Promsie实现

- async await 原理，generator
  1. generator是ES6提供的一种异步编程解决方案, 和promise的链式调用相比，会更清晰

  2. 协程:是一种更轻量级的存在，协程处在线程的环境中，一个线程可以存在多个协程，协程不被不受操作系统的管理，被执行的具体代码控制，可以自行控制程序的中断和开始

generator其实就是JS在语法层面对协程的支持，真正支持与否看运行时环境，比如高版本的node就是支持的。协程就是主程序和子协程直接控制权的切换，并伴随通信的过程，那么，从generator语法的角度来讲，yield，next就是通信接口，next是主协程向子协程通信，而yield就是子协程向主协程通信

  3. 执行generator函数 会返回 一个遍历器对象

  4. 执行next 会返回 value 和 status


  async 函数的实现，就是将 Generator 函数和自动执行器，包装在一个函数里，generator的语法糖

  await 必须包在一个async 函数里面

  ```js
     async function fn(args){
       //...
      }

   function fn(args){
       return spawn(function*() {
       // ...
       });
    }

  // 自动执行器
  function spawn(genF) {
    return new Promise(function(resolve, reject) {
      var gen = genF();

      function step(nextF) {
        try {
          var next = nextF();
        } catch(e) {
          return reject(e);
        }

        if(next.done) {
          return resolve(next.value);
        }

        Promise.resolve(next.value).then(function(value) {
          step(function() { return gen.next(value); });
        }, function(e) {
          step(function() { return gen.throw(e); });
        });
      }

      step(function() {
        return gen.next(undefined);
      });
      });
    }
  ```

- 宏任务与微任务区别


# 原型链，涉及以下

- prototype 和 __proto__

- 继承

- oop 编程思想

- 模块化
CommonJS 和 ES6 moduleAMD 与 CMD 区别（比较旧可以忽略）


# ES6 特性

- let const

- 箭头函数

- Set、Map、WeakSet 和 WeakMap

- Promsie，async，Class，Es6 module
