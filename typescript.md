# 定义

1. 什么：typescript 是微软发布一个编程语言，作为一个 javascript 的超集。

2. 特征：

   1. 会编译成纯 javasript 去运行
   2. 提供了静态类型检查，可以将很多问题在编码阶段暴露出来
   3. IDE 自动填充、自动联想
   4. 提供的静态类型系统，增强了代码的可读性以及可维护性，更加结构化
   5. 类型有时候也可以充当代码注释

3. 使用例子：
   1. 我们项目用的版本：4.3.2
   2. 用的比较多的：interface、type、enum、union tuple any、void


# 基本数据类型

1. 基本类型：string、number、boolean、symbol、bigint、null、undefined
2. 引用类型：array、 Tuple(元组)、 object(包含 Object 和{})、function
3. 特殊类型：any、unknow、void、never、Enum(枚举)
4. 其他类型：类型推理、字面量类型、交叉类型


## 字面量类型
```js
    let str:'小杜杜'
    let num: 1 | 2 | 3 = 1
    let flag:true

    str = '小杜杜' //ok
    str = 'Donmesy' // error

    num = 2 //ok
    num = 7 // error

    flag = true // ok
    flag = false // error
```

## 交叉类型
```js
   使用 & 连接

```

# 为什么要用 typeScript

1. 大型项目，涉及大量功能模块、更高的复杂性
2. 更加注意质量，可维护性、稳定性、可扩展性、可靠性
3. 需要明确规范和标砖：代码规范、设计模式、流程规范、系统架构、单元测试
4. typescript 可以在代码规范和设计模式方面提高代码质量，进而增强系统的可靠性、稳定性、可维护性

# 核心理念

1. 面向接口编程 IOP
2. 作为 OOP 体系的一部分，IOP 更加强调规则和约束，以及接口类型方法的约定，从而让开发人员尽可能的关注更抽象的程序逻辑，而不是在更细节的实现方式上浪费时间。很多大型项目采用的都是 IOP 的编程模式。

# 鸭子类型

所谓鸭子类型，就是当两个类型具有相同的属性以及方法时，它们就可以看作是同一类型
TypeScript 用这种方式来校验类型合法性，可以提升编写 TS 的体验感，绕开了传统 OOP 语言（例如 Java、C#）死板的类型约束，让写 TS 变得轻松而有趣。

# 重要类型

1. 枚举

2. 泛型

<T> This means that the data type which will be specified at the time of a function call

```js
  function foo<T>(foo: <T>): <T> {

  }

```

3. union tuple

4. type 和 interface

   1. 都可以声明对象的类型和函数的类型 shape of an object or a function signature
   2. extends: 都可以扩展, interface 通过 extends，type 通过 &
   3. type 可以使用 typeof 来声明类型, 声明基础类型，union 类型、tuple
   4. 声明合并: interface 相同的可以自动合并

https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript

# 高级用法

1. 函数重栽

```js
// 重写
    class Person{
      setName(name: string){
        return `我的名字叫${name}`
      }
    }

    class Child extends Person{
      setName(name: string){
        return `你的名字叫${name}`
      }
    }

    const yourName = new Child()
    console.log(yourName.setName('小杜杜')) // "你的名字叫小杜杜"

    // 重载
    class Person1{
      setNameAge(name: string):void;
      setNameAge(name: number):void;
      setNameAge(name:string | number): void{
        if(typeof name === 'string'){
          console.log(`我的名字是${name}`)
        }else{
          console.log(`我的年龄是${name}`)
        }
      };
    }

    const res = new Person1()
    res.setNameAge('小杜杜') // "我的名字是小杜杜"
    res.setNameAge(7) // "我的年龄是7"
```

2. TS 断言
   类型断言会告诉编译器，你不用给我进行检查，相信我，他就是这个类型

   ## 类型断言
    // as 语法
   let str: any = 'Domesy';
   let res: number = (str as string).length;

   ## 非空断言
   在上下文中当类型检查器无法断定类型时，一个新的后缀表达式操作符 ! 可以用于断言操作对象是非 null 和非 undefined 类型。

   ```ts
      const info = (name: string | null | undefined) => {
         const str: string = name!;
      };
   ```

   !可以帮助我们过滤 null和 undefined类型，也就是说，编译器会默认我们只会传来string类型的数据，所以可以赋值为str1

   ## 确定赋值断言

   ```js
   let num!: number;
   let num1!: number;

    const setNumber = () => num = 6
    const setNumber1 = () => num1 = 7

    setNumber()
    setNumber1()

    console.log(num) // error
    console.log(num1) // ok

   ```



   双重断言
   断言失效后，可能会用到，但一般情况下不会使用
   失效的情况：基础类型不能断言为接口
    interface Info{
      name: string;
      age: number;
    }

    const name = '小杜杜' as Info; // error, 原因是不能把 string 类型断言为 一个接口
    const name1 = '小杜杜' as any as Info; //ok




3. 类型守卫
   类型守卫：是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内。

   in 关键字、typeof 关键字、instanceof 和类型谓词（is)

```js
   // in
   interface Info {
      name: string
      age: number
    }

    interface Info1{
      name: string
      flage: bool
    }


    const setInfo = (data: Info | Info1) => {
      if("age" in data){
        console.log(`我的名字是：${data.name}，年龄是：${data.age}`)
      }

       if("flage" in data){
        console.log(`我的名字是：${data.name}，性别是：${data.flage}`)
      }
    }

    setInfo({name: '小杜杜', age: 7}) // "我的名字是：小杜杜，年龄是：7"
    setInfo({name: '小杜杜', flage: true}) // "我的名字是：小杜杜，性别是：true"

      // typeof
      const setInfo = (data: number | string | undefined) => {
      if(typeof data === "string"){
        console.log(`我的名字是：${data}`)
      }

      if(typeof data === "number"){
        console.log(`我的年龄是：${data}`)
      }

      if(typeof data === "undefined"){
        console.log(data)
      }
    }

    setInfo('小杜杜') // "我的名字是：小杜杜"
    setInfo(7) // "我的年龄是：7"
    setInfo(undefined) // undefined"


   // is
    class Name {
      name: string = '小杜杜'
    }

    class Age extends Name{
      age: number = 7
    }

    const setInfo = (data: Name) => {
      if (data instanceof Age) {
        console.log(`我的年龄是${data.age}`);
      } else {
        console.log(`我的名字是${data.name}`);
      }
    }

    setInfo(new Name()) // "我的名字是小杜杜"
    setInfo(new Age()) // "我的年龄是7"


   // is
    function isNumber(x: any): x is number { //默认传入的是number类型
      return typeof x === "number";
   }

   console.log(isNumber(7)) // true
   console.log(isNumber('7')) //false
   console.log(isNumber(true)) //false
```



30 道面试题
https://www.teqng.com/2021/07/21/30-%E9%81%93-typescript-%E9%9D%A2%E8%AF%95%E9%97%AE%E9%A2%98%E8%A7%A3%E6%9E%90%E5%8A%A9%E4%BD%A0%E8%BF%9B%E9%98%B6-ts-%E4%B8%93%E5%AE%B6/



https://juejin.cn/post/7088304364078497800#heading-40


高级用法: https://zhuanlan.zhihu.com/p/361968852

