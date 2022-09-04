为什么要做监控

事前预警：提前设置一个阈值，当监控的数据达到阈值时，通过短信或者邮件通知管理员。例如 API 请求数量突然间暴涨，就得进行报警，否则可能会造成服务器宕机。

事后分析：通过监控日志文件，分析故障原因和故障发生点。从而做出修改，防止这种情况再次发生。

数据采集与上报、数据整理和存储、数据展示

https://woai3c.gitee.io/introduction-to-front-end-engineering/07.html#%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E9%9C%80%E8%A6%81%E7%9B%91%E6%8E%A7




## 如何做性能监控

 ```js
window.performance = {
    timeOrigin: 1634784231210.6, // 基准时间

    timing: {
      // dns解析时间
      domainLookupStart: '',
      domainLookupEnd: '',

      // 建立连接时间
      connectStart: '',
      connectEnd: '',

      // 发起请求  请求耗时
      navigationStart: 1634784231210
      fetchStart: 1634784231214
      requestStart: 1634784231249
      responseStart: 1634784231414
      responseEnd: 1634784231622


      // dom渲染耗时
      domLoading: 1634784231429
      domComplete: 1634784232215
      domInteractive: 1634784231925

      loadEventStart: 1634784232215
      loadEventEnd: 1634784232217

      domContentLoadedEventStart: 1634784231926
      domContentLoadedEventEnd: 1634784231926

      // 重定向时间
      redirectEnd: 0
      redirectStart: 0

      // 页面卸载
      unloadEventStart: 0
      unloadEventEnd: 0

    }

}

// 标记自定义的时间点
window.performance.mark('自定义时间点', new Date);

memory


 ```

上报时机： 首图完成

首屏时间：892ms

首图时间：1068ms



## 如何做错误监控

### 错误分类

  1. js执行错误:  referenceerror

  ```js
    window.onerror()
  ```

  2. promise error

  ```js
   window.addEventlistener('unhandledrejection', callback)
   ```

  3. ajax 请求 error

    重写xhr fetch，也可以直接在请求里面加 try catch

  4. 资源加载error

  ```js
    window.addEventListener(
     "error",
     (event) => {
       if (!(event instanceof ErrorEvent)) {
         // todo
       }
     },
     true
   );
  ```


  5. 崩溃和卡顿  - 端上收集

崩溃监控其实应该叫做【卡死监控】，其实现机制是通过 worker 线程每 2 秒向主线程发送一个心跳包来判断主线程是否卡死，超过 6s 没有心跳则认为已经 crash。

  客户端 js 主线程

  web Worker



上报时机：批量上报、抽样上报
