const merge = require('webpack-merge');
const commonConfig = require('./webpack.common')({ mode: 'prod' }); // webpack通用配置
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = merge(commonConfig, {
  mode: 'production',
  stats: {
    warnings: false, // 取消警告信息
    children: false, // 取消子级信息
    modules: false, // 取消模块构建信息
  },
  output: {
    filename: 'js/[name].[contenthash:6].js',
    publicPath: '/',
  },
  plugins: [
    // 打包时先删除dist目录
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist'],
    }),
    // 提取css,为每个包含CSS的JS文件创建一个CSS文件,并且支持CSS和SourceMaps的按需加载。
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),
    // 最小化js
    new TerserPlugin(),
    // 最小化css
    new OptimizeCSSAssetsPlugin(),
    // 打包进度条
    new ProgressBarPlugin(),
  ],
});
