/** @format */

const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin') // 设置内联脚本
// 设置optimization.minimizer会覆盖webpack提供的默认设置，因此需要重新制定
const TerserPlugin = require('terser-webpack-plugin') // 最小化js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 最小化css
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = env =>
  merge(common(env), {
    mode: 'production',
    output: {
      filename: 'js/[name].[contenthash:8].js',
      publicPath: '/',
    },
    stats: 'errors-only',
    optimization: {
      minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
      moduleIds: 'hashed',
      runtimeChunk: {
        name: 'runtime',
      },
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns: ['dist'],
      }),
      new ScriptExtHtmlWebpackPlugin({
        inline: /runtime\..*\.js$/,
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
  })
