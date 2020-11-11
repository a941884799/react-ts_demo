const merge = require('webpack-merge');
// webpack通用配置
const commonConfig = require('./webpack.common')({ mode: 'prod' });
// 删除文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 本插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 最小化js
const TerserPlugin = require('terser-webpack-plugin');
// 最小化css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(commonConfig, {
	mode: 'production',
	stats: {
		warnings: false, // 取消警告信息
		children: false, // 取消子级信息
		modules: false, // 取消模块构建信息
	},
	output: {
		filename: 'js/[name].[contenthash:8].js',
		publicPath: '/',
	},
	plugins: [
		new CleanWebpackPlugin({
			cleanAfterEveryBuildPatterns: ['dist'], // 打包时先删除dist目录
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
		}),
		new TerserPlugin(),
		new OptimizeCSSAssetsPlugin(),
	],
});
