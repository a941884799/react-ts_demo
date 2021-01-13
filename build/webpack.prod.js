const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = (args, process) => {
  const commonConfig = require('./webpack.common')(args, process); // webpack通用配置
  return merge(commonConfig, {
    mode: 'production',
    // 优化
    optimization: {
      moduleIds: 'hashed',
      // 创建一个 所有chunk 共享的运行时文件,别名为 runtime
      runtimeChunk: { name: 'runtime' },
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
      // 将运行时模块内联到html中
      new ScriptExtHtmlWebpackPlugin({ inline: /runtime(\..*)?\.js$/ }),
    ],
  });
};
