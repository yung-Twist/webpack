const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js', // 入口文件
	output: {
		filename: 'js/index.js', // 输出文件名称
		path: resolve(__dirname, 'dist') // 文件输出路径
	},
	module: {
		rules: [
			// js语法检查 eslint-loader eslint
			// 使用aitbnb检查代码 eslint-config-airbnb-base eslint-plugin-import
			// 需要在package.json中配置eslint检查规则
			{
				test: /\.js$/,
				loader: 'eslint-loader',
				enforce:'pre',//优先执行这个loader
				exclude: /node_modules/,
				options: {
					fix: true //自动修复代码
				}
			},

			// js兼容性处理 babel-loader  @babel/preset-env @babel/core
			// 1.@babel/preset-env只能转化普通语法 promise等不能兼容
			/* 2.全部兼容性处理@babel/polyfill 在index.js入口文件直接引用即可 import ‘@babel/polyfill’
				问题：引入所有兼容性代码，体积太大了。
			*/
			// 3.按需加载兼容代码 core-js
			{
				test:/\.js$/,
				exclude:/node_modules/,
				loader:'babel-loader',
				options:{
					presets:[
						['@babel/preset-env',
						{
							// 按需加载
							useBuiltIns: "usage",
							corejs:{
								version:3
							},
							targets:{
								chrome:"60",
								ie:"9",
								safari:"10",
								edge:"17"
							}
						}]
					]
				}
			}
		]
	},
	plugins: [
		// 编译html文件，自动加入编译的index.js文件
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify:{
				collapseWhitespace:true,//移除空格
				removeComments:true//移除注释
			}
		})
	],
	// 生产环境下会自动压缩js代码
	mode: 'production'
};
