/** @format */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = env => ({
  entry: path.resolve(__dirname, '../src/app'),
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
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, '../src/assets/images/favicon.ico'),
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [{from: 'public', to: 'public'}],
    }),
  ],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@assets': path.resolve(__dirname, '../src'),
      '@images': path.resolve(__dirname, '../src/assets/images'),
      '@utils': path.resolve(__dirname, '../src/utils'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss'],
  },
})
