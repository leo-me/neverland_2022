# webpack
# vite

# 作用

- 源代码无法直接在浏览器上运行
- 压缩源代码


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
    function simpleLoader(content, map, meta) {

    }

```

# plugin
扩展webpack对象，在合适和适合通过webpack 的API，监听打包编译过程的事件， 改变输出变量
tapable


```js


```

# 怎么处理各类文件

1. js

   react, jsx

   常见 Babel 预设还有：

   @babel/preset-flow
   @babel/preset-react
   @babel/preset-typescript


   ```js
  const config = {
    rules: [
      {
        test: /\.jsx/,
        exclude: /node_modules/,
        use:{
           loader: 'babel-loader',
           options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime']
           }
        }

      }
    ]
  };

   ```

2. less sass

   postcss-loader: 自动添加css部分属性的浏览器前缀

   ```js
   // 引入插件
   const MiniCssExtractPlugin = require('mini-css-extract-plugin');
   const config = {
   // ...
   rules: [
      {
        test: /\.(s[ac]|c)ss$/i, //匹配所有的 sass/scss/css 文件
        use: [
          //'style-loader', // style 标签
          MiniCssExtractPlugin.loader, // 抽离样式文件
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      },
    ]
   },
   // ...
   }
   ```




3. 静态文件

   图片、字体：

  file-loader解决图片引入问题，并将图片 copy 到指定目录，默认为 disturl-loader解依赖 file-loader，当图片小于 limit 值的时候，会将图片转为 base64 编码，大于 limit 值的时候依然是使用 file-loader 进行拷贝img-loader压缩图片

   ```js


      const config = {
        // ...
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,  // 匹配字体文件
          use: [
            {
              loader: 'url-loader',
              options: {
                name: 'fonts/[name][hash:8].[ext]', // 体积大于 10KB 打包到 fonts 目录下
                limit: 10 * 1024,
              }
            }
          ]
        },
        // ...
      }


   ```


   webpack5 新增资源模块(asset module)，允许使用资源文件（字体，图标等）而无需配置额外的 loader。
   ```js
   const config = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.(jpe?g|png|gif)$/i,
        type: 'asset',
        generator: {
          // 输出文件位置以及文件名
          // [ext] 自带 "." 这个与 url-loader 配置不同
          filename: "[name][hash:8][ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 50 * 1024 //超过50kb不转 base64
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: 'asset',
        generator: {
          // 输出文件位置以及文件名
          filename: "[name][hash:8][ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 超过100kb不转 base64
          }
        }
      },
    ]
  },
  // ...
}

   ```






# webpack 5 新特性

1. 内置 FileSystem Cache 能力加速二次构建，之前需要用cache-loader、babel-loader 来开启缓存
   chunkid、content hash
   Webpack5 之前，文件打包后的名称是通过 ID 顺序排列的，一旦后续有一个文件进行了改动，那么必将造成后面的文件打包出来的文件名产生变化，即使文件内容没有产生改变。因此会造成资源的缓存失效。

   Webpack5 有着更友好的长期缓存能力支持，其通过 hash 生成算法，为打包后的 modules 和 chunks 计算出一个短的数字 ID ，这样即使中间删除了某一个文件，也不会造成大量的文件缓存失效，

2. 更好的tree-shaking，dead code

3. pollyfill 被移除，自行添加pollyfill

4. 内置静态资源构建能力 —— Asset Modules





# hash

hash ：任何一个文件改动，整个项目的构建 hash 值都会改变；
chunkhash：文件的改动只会影响其所在 chunk 的 hash 值；
contenthash：每个文件都有单独的 hash 值，文件的改动只会影响自身的 hash 值；




# 优化

# alias 优化
alias 用的创建 import 或 require 的别名，用来简化模块引用，项目中基本都需要进行配置。

```js
const path = require('path')
...
// 路径处理方法
function resolve(dir){
  return path.join(__dirname, dir);
}

 const config  = {
  ...
  resolve:{
    // 配置别名
    alias: {
      '~': resolve('src'),
      '@': resolve('src'),
      'components': resolve('src/components'),
    }
  }
};

```

构建速度

```js
// 费时分析
 const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
```

# 多进程配置  thread-loader

 ```js
const path = require('path');

// 路径处理方法
function resolve(dir){
  return path.join(__dirname, dir);
}

const config = {
  //...
  module: {
    noParse: /jquery|lodash/,
    rules: [
      {
        test: /\.js$/i,
        include: resolve('src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader', // 开启多进程打包
            options: {
              worker: 3,
            }
          },
          'babel-loader',
        ]
      },
      // ...
    ]
  }
};

```

# 使用缓存

```js
// babel-loader

const config = {
 module: {
    noParse: /jquery|lodash/,
    rules: [
      {
        test: /\.js$/i,
        include: resolve('src'),
        exclude: /node_modules/,
        use: [
          // ...
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true // 启用缓存
            }
          },
        ]
      },
      // ...
    ]
  }
}

// cache-loader
const config = {
 module: {
    // ...
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i, //匹配所有的 sass/scss/css 文件
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'cache-loader', // 获取前面 loader 转换的结果
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      },
      // ...
    ]
  }
}

// cache 持久化缓存
// webpack5: 通过配置 cache 缓存生成的 webpack 模块和 chunk，来改善构建速度。

const config = {
  cache: {
    type: 'filesystem',
  },
};

```

3. 缩小范围

## noParse
不需要解析依赖的第三方大型类库等，可以通过这个字段进行配置，以提高构建速度
使用 noParse 进行忽略的模块文件中不会解析 import、require 等语法

```js
const config = {
  //...
  module: {
    noParse: /jquery|lodash/,
    rules:[...]
  }

};
```



# 构建体积

 构建结果分析

 工具：webpack-bundle-analyzer


 1. externals
externals 配置选项提供了「从输出的 bundle 中排除依赖」的方法。此功能通常对 library 开发人员来说是最有用的，然而也会有各种各样的应用程序用到它。

例如，从 CDN 引入 jQuery，而不是把它打包：

```js

const config = {
  //...
  externals: {
    jquery: 'jQuery',
  },
};

```




## IgnorePlugin

防止在 import 或 require 调用时，生成以下正则表达式匹配的模块：

路径：requestRegExp 匹配(test)资源请求路径的正则表达式。
目录：contextRegExp 匹配(test)资源上下文（目录）的正则表达式。

moment 2.18 会将所有本地化内容和核心功能一起打包（见该 GitHub issue）。你可使用 IgnorePlugin 在打包时忽略本地化内容

```js

// 配置 IgnorePlugin

// 引入 webpack
const webpack = require('webpack')

const config = {
  ...
  plugins:[ // 配置插件
    ...
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ]
};
```

# 压缩

1. 压缩css

- cssnano
- mqpacker
- postcss-discard-duplicates


2. 压缩js

```js
  const TerserPlugin = require('terser-webpack-plugin'); // terser plugin

   const config = {
     // ...
     optimization: {
       minimize: true, // 开启最小化
       minimizer: [
         // ...
         new TerserPlugin({})
       ]
     },
     // ...
   }

```

3. tree shaking

Tree-shaking 作用是剔除没有使用的代码，以降低包的体积

webpack 默认支持，需要在 .bablerc 里面设置 model：false，即可在生产环境下默认开启



4. splitChunks 分包配置

分包规则
新的 chunk 可以被共享，或者模块来自于 node_modules 文件夹
新的 chunk 体积大于 20kb（在进行 min+gz 之前的体积）
当按需加载 chunks 时，并行请求的最大数量小于或等于 30
当加载初始化页面时，并发请求的最大数量小于或等于 30

当尝试满足最后两个条件时，最好使用较大的 chunks。

```js
const config = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: { // 配置提取模块的方案
        default: false,
        styles: {
            name: 'styles',
            test: /\.(s?css|less|sass)$/,
            chunks: 'all',
            enforce: true,
            priority: 10,
          },
          common: {
            name: 'chunk-common',
            chunks: 'all',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 1,
            enforce: true,
            reuseExistingChunk: true,
          },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 2,
            enforce: true,
            reuseExistingChunk: true,
          },
         // ... 根据不同项目再细化拆分内容
      },
    },
  },
}

```

https://juejin.cn/post/7023242274876162084




# treeshaking 原理

Make 阶段，收集模块导出变量并记录到模块依赖关系图 ModuleGraph 变量中
Seal 阶段，遍历 ModuleGraph 标记模块导出变量有没有被使用
生成产物时，若变量没有被其它模块使用则删除对应的导出语句

基于es的静态的模块的依赖关系，导入导出只能在模块的顶层，去生成模块的依赖关系图


