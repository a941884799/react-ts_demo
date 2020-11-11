/** @format */

const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 获取MiniCssExtractPlugin的loader
const MiniCssExtractPluginLoader = require('mini-css-extract-plugin').loader;
// 设置内联脚本
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = env => ({
	// 入口
	entry: [path.resolve(__dirname, '../src/index')],
	// 出口
	output: { path: path.resolve(__dirname, '../dist') },
	// 优化
	optimization: {
		// 创建一个 所有chunk 共享的运行时文件,别名为 runtime
		runtimeChunk: { name: 'runtime' },
	},
	// 模组
	module: {
		rules: [
			{
				test: /\.(j|t)sx?$/,
				loader: 'babel-loader?cacheDirectory',
				exclude: path.resolve(__dirname, '../node_modules'),
				options: {
					presets: ['@babel/env', '@babel/preset-react', '@babel/preset-typescript'],
					plugins: [['@babel/plugin-transform-runtime', { corejs: 3 }], ['@babel/plugin-syntax-dynamic-import']],
				},
			},
			{
				enforce: 'pre',
				test: /\.(j|t)sx?$/,
				loader: 'eslint-loader',
				exclude: [path.resolve(__dirname, '../node_modules'), path.resolve(__dirname, '../dist')],
				// include: [path.resolve(__dirname, '../src')],
				options: { cache: true, fix: false },
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					// 生产环境使用 MiniCssExtractPlugin.loader拆除css,开发环境使用 style-loader
					env.mode === 'prod' ? { loader: MiniCssExtractPluginLoader, options: { esModule: true } } : 'style-loader',
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							esModule: false,
							limit: 3072,
							name: env.mode === 'prod' ? 'images/[name].[hash:8].[ext]' : '[name].[ext]',
						},
					},
				],
			},
		],
	},
	// 插件
	plugins: [
		// 定义全局常量
		new Webpack.DefinePlugin({
			globalBoolean: JSON.stringify(true),
			globalAge: JSON.stringify(25),
			globalName: JSON.stringify('王龙岗'),
			globalObj: JSON.stringify({ name: '王龙岗', sex: '男', age: 25 }),
		}),
		// 全局引入lodash，并命名为_
		new Webpack.ProvidePlugin({
			_: 'lodash',
		}),
		// 直接拷贝 static 目录的东西,不进行打包压缩
		new CopyWebpackPlugin({
			patterns: [{ from: 'static', to: 'static' }],
		}),
		// 使用 template 目录设为 index.html 作为html模板
		new HtmlWebpackPlugin({
			favicon: path.resolve(__dirname, '../src/assets/images/favicon.ico'),
			template: path.resolve(__dirname, '../template/index.html'),
		}),
		// 将运行时模块内联到html中
		new ScriptExtHtmlWebpackPlugin({ inline: /^runtime.*\.js$/ }),
	],
	resolve: {
		alias: {
			'@src': path.resolve(__dirname, '../src'),
			'@api': path.resolve(__dirname, '../src/api'),
			'@pages': path.resolve(__dirname, '../src/pages'),
			'@utils': path.resolve(__dirname, '../src/utils'),
			'@store': path.resolve(__dirname, '../src/store'),
			'@router': path.resolve(__dirname, '../src/router'),
			'@components': path.resolve(__dirname, '../src/components'),
			'@assets': path.resolve(__dirname, '../src'),
			'@styles': path.resolve(__dirname, '../src/assets/styles'),
			'@images': path.resolve(__dirname, '../src/assets/images'),
		},
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss'],
	},
});
