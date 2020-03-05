const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 提取js中的css
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// 压缩css
const CssCommonConfig = [
	MiniCssExtractPlugin.loader,
	'css-loader',
	{
		loader: 'postcss-loader',
		options: {
			// postcss 对css兼容性进行处理
			ident: 'postcss', // 固定写法
			// postcss的插件
			plugins: () => [require('postcss-preset-env')()] // 这里也可以自己写数组
		}
	}
];
module.exports = {
	entry: './src/index.js', // 入口文件
	output: {
		filename: 'js/index.js', // 输出文件名称
		path: resolve(__dirname, 'dist') // 文件输出路径
	},
	module: {
		rules: [
			// use执行顺序从右到左，从下到上
			{
				test: /\.css$/,
				use: [...CssCommonConfig]
			},
			{
				test: /\.less$/,
				use: [...CssCommonConfig, 'less-loader']
			},
			// js语法检查 eslint-loader eslint
			// 使用aitbnb检查代码 eslint-config-airbnb-base eslint-plugin-import
			// 需要在package.json中配置eslint检查规则
			{
				test: /\.js$/,
				loader: 'eslint-loader',
				enforce: 'pre', // 优先执行这个loader
				exclude: /node_modules/,
				options: {
					fix: true // 自动修复代码
				}
			},

			// js兼容性处理 babel-loader  @babel/preset-env @babel/core
			// 1.@babel/preset-env只能转化普通语法 promise等不能兼容
			/* 2.全部兼容性处理@babel/polyfill 在index.js入口文件直接引用即可 import ‘@babel/polyfill’
				问题：引入所有兼容性代码，体积太大了。
			*/
			// 3.按需加载兼容代码 core-js
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: [
						[
							'@babel/preset-env',
							{
								// 按需加载babel插件规则
								useBuiltIns: 'usage',
								corejs: {
									version: 3
								},
								targets: {
									chrome: '60',
									ie: '9',
									safari: '10',
									edge: '17'
								}
							}
						]
					]
				}
			},
			{
				// 下载url-loader和file-loader
				test: /\.(jpg|png|gif|jpeg)$/,
				loader: 'url-loader', // 只有一个loader时可以用loader代替use
				options: {
					// limit: 8 * 1024, // 文件小于8K时将图片打包成base64
					esModule: false, // 关闭es6模块化解析
					name: '[hash:12].[ext]',
					outputPath: 'images' // 文件输入路径（文件输出主路径下 dist ）
				}
			},
			{
				// 下载html-loader
				// 配置编译html文件中标签引用图片
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				// 处理其他资源
				// exclude编译其他资源的文件（字体图标）
				exclude: /\.(html|css|less|js|jpg|png|gif|jpeg)$/,
				loader: 'file-loader',
				options: {
					name: '[hash:12].[ext]',
					outputPath: 'media'
				}
			}
		]
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
		}),
		// css打包路径
		new MiniCssExtractPlugin({
			filename: 'css/index.css'
		}),
		// 压缩css
		new optimizeCssAssetsWebpackPlugin()
	],
	mode: 'production',
	devServer: {
		// 只在内存中编译，没有打包输出
		// 构建目录
		contentBase: resolve(__dirname, 'dist'),
		// 是否使用Gzip压缩
		compress: true,
		port: 8888,
		hot: true,
		open: false // 是否自动打开浏览器
	},
	// 代码调试插件
	devtool: 'eval-source-map', // 开发环境建议使用eval-source-map，生产环境使用source-map有利于调试，隐藏代码可使用nosources-source-map(全部隐藏)或者hidden-source-map（只隐藏源代码）
	esternals: {
		// 忽略文件进行打包比如cdn文件
		// jquery:"jQuery"
	}
};
