## oneof 打包只引用一个 loader

## hash（contenthash）缓存

## tree shaking：去除无用代码，必需使用 es6 模块 并且开启 production

-   在 package.json 中设置"sideEffects":false(所有代码都可以进行 tree shaking)
    -   副作用，会把@babel/polyfill 干掉
    -   解决方法："sideEffects":["*.css","*.less"]
