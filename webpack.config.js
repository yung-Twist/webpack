const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'built.js',
		path: resolve(__dirname, 'build')
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			},
			{
				// 问题 该loader只能处理css中的图片，处理不了html中的img标签文件
				test: /\.(jpg|png|gif)$/,
				// 下载 url-loader file-loader url依赖于file所以写一个就可以了
				loader: 'url-loader', //只有一个loader时可以直接用loader，不用写use
				options: {
					// 图片小于14k时会被处理为base64
					limit: 14 * 1024,
					// 问题：url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs，解析会出现引用[object Module]
					esModule: false, //关闭es6模块化解析
					name: '[hash:12].[ext]' //[hash:12]去hash的前10位，[ext]原文件名
				}
			},
			{
				test: /\.html$/,
				// 处理html中的img标签图片，从而可以被url-loader进行处理
				loader: 'html-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	],
	mode: 'development'
};
