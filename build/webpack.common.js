/** @format */
const path = require('path');
// const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPluginLoader = require('mini-css-extract-plugin').loader;

module.exports = args => {
  const { mode } = args;
  return {
    // 入口
    entry: path.resolve(__dirname, '../src/index'),
    // 出口
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
      filename: mode === 'dev' ? '[name].js' : 'js/[name].[chunkhash:8].js',
    },
    cache: true,
    stats: {
      assets: false, // 取消资源信息，如果资源过多可启用
      warnings: false, // 取消警告信息
      children: false, // 取消子级信息
      modules: false, // 取消模块构建信息
    },
    // 模组
    module: {
      rules: [
        {
          // enforce: 'pre', // 最高权重,最先加载
          test: /\.(j|t)sx?$/,
          include: path.resolve(__dirname, '../src'),
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                // 预设
                presets: [
                  [
                    '@babel/env',
                    {
                      useBuiltIns: 'usage', // 怎么运用 polyfill
                      corejs: { version: 3, proposals: false },
                    },
                  ],
                  '@babel/preset-react',
                  '@babel/preset-typescript',
                ],
                // 插件
                plugins: [
                  ['@babel/plugin-proposal-class-properties'], // 编译类
                  ['@babel/plugin-transform-runtime'],
                  ['@babel/plugin-syntax-dynamic-import'],
                  mode === 'dev' && 'react-refresh/babel', // react热更新
                  mode === 'dev' && '@babel/plugin-transform-react-jsx-source', // 组件栈追踪(显示报错的具体行数)
                ].filter(Boolean),
              },
            },
          ],
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            // 开发环境使用 style-loader, 生产环境使用 MiniCssExtractPlugin.loader分离css,
            mode === 'dev' ? 'style-loader' : { loader: MiniCssExtractPluginLoader, options: { esModule: true } },
            mode === 'dev' ? { loader: 'css-loader', options: { sourceMap: true } } : 'css-loader',
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
                sassOptions: { fiber: require('fibers') },
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
          include: path.resolve(__dirname, '../src'),
          use: [
            {
              loader: 'url-loader',
              options: {
                esModule: false,
                limit: 3072,
                name: mode === 'dev' ? '[name].[ext]' : 'images/[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
    // 插件
    plugins: [
      // 定义全局常量
      // new Webpack.DefinePlugin({ globalObj: JSON.stringify({ name: '王xx' }) }),
      // 全局引入lodash，并命名为_
      // new Webpack.ProvidePlugin({ _: 'lodash' }),
      // 直接拷贝 static 目录的东西,不进行打包压缩
      new CopyWebpackPlugin({
        patterns: [{ from: 'static', to: 'static' }],
      }),
      // 使用 template 目录设为 index.html 作为html模板
      new HtmlWebpackPlugin({
        title: '我的demo',
        template: path.resolve(__dirname, '../template/index.html'),
        favicon: path.resolve(__dirname, '../src/assets/images/favicon.ico'),
        js: ['/static/hello.js'],
      }),
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
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
  };
};
