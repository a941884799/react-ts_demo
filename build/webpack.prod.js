const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (args, process) => {
  const commonConfig = require('./webpack.common')(args, process); // webpack通用配置
  return merge(commonConfig, {
    mode: 'production',
    output: {
      publicPath: '/',
      filename: 'js/[name].[chunkhash:6].js',
    },
    plugins: [
      // 打包时先删除dist目录
      new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns: ['dist'],
      }),
      // 提取css,为每个包含CSS的JS文件创建一个CSS文件,并且支持CSS和SourceMaps的按需加载。
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:6].css',
      }),
    ],
  });
};
