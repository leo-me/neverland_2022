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

    - store 维护：result 、 提醒msg
    - 使用Map来存储，key 为 index + 校验key + 校验内容

    策略模式
    - 抽象校验规则：是否为空、是否为一个合法的名称、是否为合法路径
    - 注册校验规则，组合起来
    - 校验，遍历校验规则，去校验内容

    3. 我的use 通过useRef 把debounce包裹的函数存下来

      ahooks：
      useDebounce: 传入的是一个state value， DebouncedValue 只会在输入结束 500ms 后变化。

      useDebounceFn: 传入fn，wait  返回一个{run, cancel，flush }， 直接运行 run



# fiber

1. react 的理念: 快速响应

3. react 15的问题，掉帧
    架构: reconciler renderer

4. react 15: schduler(时间分片、优先级调度)、reconciler、renderer


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

怎么实现的 时间切片

根据 fps 动态调整 时间片 60hz 16.6ms


task -> 全部job -> requesetAnimationFrame -> 浏览器渲染 ---> requestIdleCallback





