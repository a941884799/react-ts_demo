/** @format */

const path = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = env => ({
  entry: path.resolve(__dirname, '../src/index'),
  output: {
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: 'babel-loader?cacheDirectory',
        exclude: path.resolve(__dirname, '../node_modules'),
        options: {
          presets: ['@babel/env', '@babel/preset-react', '@babel/preset-typescript'],
          plugins: [['@babel/plugin-transform-runtime', {corejs: 3}]],
        },
      },
      {
        enforce: 'pre',
        test: /\.(j|t)sx?$/,
        loader: 'eslint-loader',
        exclude: [path.resolve(__dirname, '../node_modules'), path.resolve(__dirname, '../dist')],
        // include: [path.resolve(__dirname, '../src/pages/EmergencyResponse/VpnViolation')],
        options: {
          // cache: true,
          // fix: true
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          env.mode === 'prod'
            ? {
                loader: MiniCssExtractPlugin.loader,
                options: {esModule: true},
              }
            : 'style-loader',
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
  plugins: [
    // 定义全局常量
    new Webpack.DefinePlugin({
      globalBoolean: JSON.stringify(true),
      globalAge: JSON.stringify(25),
      globalName: JSON.stringify('王龙岗'),
      globalObj: JSON.stringify({name: '王龙岗', sex: '男', age: 25}),
    }),
    // 全局引入lodash，并命名为_
    new Webpack.ProvidePlugin({
      _: 'lodash',
    }),
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, '../src/assets/images/favicon.ico'),
      template: path.resolve(__dirname, '../template/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [{from: 'static', to: 'static'}],
    }),
  ],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@store': path.resolve(__dirname, '../src/store'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@assets': path.resolve(__dirname, '../src'),
      '@styles': path.resolve(__dirname, '../src/assets/styles'),
      '@images': path.resolve(__dirname, '../src/assets/images'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss'],
  },
})
