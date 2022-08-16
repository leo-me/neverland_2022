webpack
vite

# 打包流程
1. 读取配置文件 webpack.config.js
2. 创建compiler对象, 插件实例化 new plugin
3. 开始读取entris，递归遍历所有入口
4. 创建compilation对象，回调compilation相关钩子
5. 依次进入每个入口文件, 用loader进行编译
5. 所有文件编译转化完成，包含输出信息
6. 完成编译

# loader
文件以字符串的方式读入，对其进行语法分析和转换，栽入的模块会转换成js可以识别的代码，来完成模块的集成

```js
    function loader(content, map, meta) {

    }

```

# plugin
扩展webpack对象，在合适和适合通过webpack 的API 改变输出变量




# 怎么处理各类文件

1. js

   react, jsx ->

2. less sass
   postcss-loader


3. 静态文件

   图片：

   字体：

4.