const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //提取js中的css
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); //压缩css
//process.env.NODE_ENV = 'development'; //设置开发环境，不设置则默认为生产环境
// process.env.NODE_ENV = 'production'//设置生产环境
module.exports = {
	entry: './src/index.js', //入口文件
	output: {
		filename: 'js/index.js', //输出文件名称
		path: resolve(__dirname, 'dist') //文件输出路径
	},
	module: {
		rules: [
			// use执行顺序从右到左，从下到上
			{
				test: /\.css$/,
				use: [
					//'style-loader', //将样式放入html文件中
					MiniCssExtractPlugin.loader, //将css文件打包的css文件夹内，这里不能使用'style-loader'
					'css-loader',
					// css兼容性处理 postcss => postcss-loader postcss-preset-env
					// postcss-preset-env帮postcss找到package.json中的browerslist里面的配置，通过配置加载指定的兼容性
					// 'postcss-loader',//使用postcss的默认配置
					//修改loader的配置写法
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss', //固定写法
							// postcss的插件
							plugins: () => [require('postcss-preset-env')()] //这里也可以自己写数组
						}
					}
				]
			},
			{
				test: /\.less$/,
				use: [
					// 'style-loader',
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss', //固定写法
							// postcss的插件
							plugins: [require('postcss-preset-env')()]
						}
					},
					'less-loader'
				]
			},
			{
				//下载url-loader和file-loader
				test: /\.(jpg|png|gif|jpeg)$/,
				loader: 'url-loader', //只有一个laoder时可以用loader代替use
				options: {
					limit: 8 * 1024, //文件小于8K时将图片打包成base64
					esModule: false, //关闭es6模块化解析
					name: '[hash:12].[ext]',
					outputPath: 'images' //文件输入路径（文件输出主路径下 dist ）
				}
			},
			{
				// 下载html-loader
				// 配置编译html文件中标签引用图片
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				//处理其他资源
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
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'css/index.css'
		}),
		new optimizeCssAssetsWebpackPlugin()
	],
	mode: 'development',
	devServer: {
		// 只在内存中编译，没有打包输出
		// 构建目录
		contentBase: resolve(__dirname, 'dist'),
		// 是否使用Gzip压缩
		compress: true,
		port: 8888,
		open: false //是否自动打开浏览器
	}
};
