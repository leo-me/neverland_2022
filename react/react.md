# hooks

    react 提倡函数式编程，心智模型：代数效应，副作用从函数调用中分离

    class组件: 生命周期、this问题

    this: React本身会随着时间的推移而改变，以便你可以在渲染方法以及生命周期方法中得到最新的实例

    需要非常清楚 声明周期、this的问题


    组件复用

    1. HOC
    2. render Props


    有哪些hooks

    useState,useEffect,useMemo,useCallback,useContext,useReducer

    怎么执行的



    自定义 hooks

    1. 请求hooks

    ```js
    import { useState, useEffect } from 'react';

       const useFetch = (url = '', options = null) => {
       const [data, setData] = useState(null);
       const [error, setError] = useState(null);
       const [loading, setLoading] = useState(false);

       useEffect(() => {
           let isMounted = true;

           setLoading(true);

           fetch(url, options)
           .then(res => res.json())
           .then(data => {
               if (isMounted) {
                setData(data);
                setError(null);
               }
           })
           .catch(error => {
               if (isMounted) {
               setError(error);
               setData(null);
               }
           })
           .finally(() => isMounted && setLoading(false));

           return () => (isMounted = false);
       }, [url, options]);

       return { loading, error, data };
       };

       export default useFetch;

       const { loading, error, data = [] } = useFetch('href');


    ```

    2. 表单校验hooks

    - 使用Map来存储: result 、 提醒msg，key 为 index + 校验key + 校验内容


    策略模式
    - 抽象校验规则：是否为空、是否为一个合法的名称、是否为合法路径
    - 注册校验规则，组合起来
    - 校验，遍历校验规则，去校验内容

    1. 我的use 通过useRef 把debounce包裹的函数存下来

      ahooks：

      useDebounce: 传入的是一个state value， DebouncedValue 只会在输入结束 500ms 后变化。

      useDebounceFn: 传入fn，wait  返回一个{run, cancel，flush }， 直接运行 run



# fiber

1. react 的理念: 快速响应

3. react 15的问题，掉帧
    架构: reconciler renderer

4. react 16: schduler(时间分片、优先级调度)、reconciler、renderer


5. fiber：
   1. 架构：递归 -> fiber reconciler

   2. 数据结构(保存节点 类型 属性 等信息)

   3. 动态的工作单元：保留本次更新改变的状态，要执行的操作（增、删除、改）

   ```js
   function FiberNode(
     tag: WorkTag,
     pendingProps: mixed,
     key: null | string,
     mode: TypeOfMode,
   ) {
     // 作为静态数据结构的属性
     this.tag = tag;
     this.key = key;
     this.elementType = null;
     this.type = null;
     this.stateNode = null;

     // 用于连接其他Fiber节点形成Fiber树
     this.return = null;
     this.child = null;
     this.sibling = null;
     this.index = 0;

     this.ref = null;

     // 作为动态的工作单元的属性
     this.pendingProps = pendingProps;
     this.memoizedProps = null;
     this.updateQueue = null;
     this.memoizedState = null;
     this.dependencies = null;

     this.mode = mode;

     this.effectTag = NoEffect;
     this.nextEffect = null;

     this.firstEffect = null;
     this.lastEffect = null;

     // 调度优先级相关
     this.lanes = NoLanes;
     this.childLanes = NoLanes;

     // 指向该fiber在另一次更新时对应的fiber
     this.alternate = null;
   }
   ```

jsx -> fiber tree


fiber tree 的结构 和 遍历过程


双缓存 fiber tree




核心

怎么实现的 (时间切片 优先级调度)

根据 fps 动态调整 时间片 60hz 16.6ms


task -> 全部job -> requesetAnimationFrame -> 浏览器渲染 ---> requestIdleCallback



可打断的更新

时间切片：怎么做的

怎么把控制权交回给浏览器: messagechanel


fiber tree 是什么，怎么遍历的？


调度的过程

首先每个任务都会有各自的优先级，通过当前时间加上优先级所对应的常量我们可以计算出 expriationTime，高优先级的任务会打断低优先级任务

在调度之前，判断当前任务是否过期，过期的话无须调度，直接调用 port.postMessage(undefined)，这样就能在渲染后马上执行过期任务了

如果任务没有过期，就通过 requestAnimationFrame 启动定时器，在重绘前调用回调方法

在回调方法中我们首先需要计算每一帧的时间以及下一帧的时间，然后执行 port.postMessage(undefined)

channel.port1.onmessage 会在渲染后被调用，在这个过程中我们首先需要去判断当前时间是否小于下一帧时间。如果小于的话就代表我们尚有空余时间去执行任务；如果大于的话就代表当前帧已经没有空闲时间了，这时候我们需要去判断是否有任务过期，过期的话不管三七二十一还是得去执行这个任务。如果没有过期的话，那就只能把这个任务丢到下一帧看能不能执行了。



# react 执行过程




# 更新过程
