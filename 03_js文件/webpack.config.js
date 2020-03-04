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
			// {
			// 	test: /\.js$/,
			// 	loader: 'eslint-loader',
			// 	exclude: /node_modules/,
			// 	options: {
			// 		fix: true //自动修复代码
			// 	}
			// }
		]
	},
	plugins: [
		// 编译html文件，自动加入编译的index.js文件
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	],
	mode: 'development'
};
