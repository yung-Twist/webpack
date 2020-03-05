const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	// entry: './src/js/index.js', // 单入口文件
	entry: {
		main: './src/js/index.js',
		test: './src/js/test.js'
	},
	output: {
		filename: 'js/[name].[contenthash:10].js', // 输出文件名称
		path: resolve(__dirname, 'dist') // 文件输出路径
	},
	plugins: [
		// 编译html文件，自动加入编译的index.js文件
		new HtmlWebpackPlugin({
			template: './src/index.html',
			// 压缩html文件
			minify: {
				collapseWhitespace: true, // 移除空格
				removeComments: true // 移除注释
			}
		})
	],
	/*
		可以将node_modules中的代码单独打包
		自动分析入口chunk，如果有公共文件，会单独打包成一个文件
	*/
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},
	mode: 'development'
};
