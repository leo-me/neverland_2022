一面：

1. 介绍一下react 运行的整个流程

2. react fiber的原理以及为什么可中断


3. react一般有什么优化可以避免重渲染？
shouldComponentUpdate
  # React.memo

  # PureComponent 内置shouldComponentUpdate， 会对props 和 state 浅比较


4. react和vue的区别

   1. react 是一个构建ui的库，vue 是拥有完整的 vuex vue-router


   2. 语法：不一样，react 是tsx 、vue 模板


   3. 更新：机制不一样，react是完整的 从上到下的更新， vue是小的 watcher,每个组件都有组件的watcher实例

   4. 优化： react 快速响应用户，vue 优化每个任务，配合模板

   5. 使用上： react的市场占有量会更大，vue会更好理解一下，更好上手



5. react的优先级了解吗，react如何确保一个低优先级的任务始终可以得到运行的机会？
   scheduler 调度器的优先级，不同的优先级对应着不同的过期期限

   包含五个优先级：
```js
   var ImmediatePriority = 1;
   var UserBlockingPriority = 2;
   var NormalPriority = 3;
   var LowPriority = 4;
   var IdlePriority = 5;

   // 优先级
   var maxSigned31BitInt = 1073741823;

   // Times out immediately
   var IMMEDIATE_PRIORITY_TIMEOUT = -1;
   // Eventually times out
   var USER_BLOCKING_PRIORITY = 250;
   var NORMAL_PRIORITY_TIMEOUT = 5000;
   var LOW_PRIORITY_TIMEOUT = 10000;
   // Never times out
   var IDLE_PRIORITY = maxSigned31BitInt;
```

执行workloop的时候，从队列取出任务来，如果任务已经过期了，不需要经过调度，就可以运行了


1. 项目中用到了mobx，说下为什么用它以及它有什么坑？





2. 项目中用到了vite，说下怎么在vite上怎么打包的?




3. 怎么处理复杂嵌套对象的redux设计（封装一层action）

4.  有很多个sdk要接入，如何让新人没有心智负担的接入？（考察设计模式，可以设计一套规范，需要接入的sdk用extends的方式继承） - 参考一下这题

5.  算法：判断两个链表是否相交




二面：
基本就是聊项目，技术负责人对我的一些项目比较感兴趣
问了一下自己的职业规划，还有主考看有没有技术追求




三面：
聊自己的职业规划以及为什么考虑这家公司




场景题

基础:

HTTP1/2区别比较，js中map的实现



场景题

一个请求用postman很快返回，但是用浏览器花几十秒，怎么排查

1. 使用 无痕模式 打开，排除插件的影响
2. 打开 调试模式 performnace，录屏，查看耗时最长的函数
3. 打断点 debug


算法

图的最短路径、二叉树遍历

图的最短路径 743题 - 待处理


