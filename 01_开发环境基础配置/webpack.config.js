const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
					'style-loader', //将样式放入html文件中
					'css-loader'
				]
			},
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
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
		})
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
