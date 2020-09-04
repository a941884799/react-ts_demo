/** @format */

const merge = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')

module.exports = env =>
  merge(common(env), {
    mode: 'development',
    devtool: 'inline-cheap-source-map',
    output: {
      filename: 'js/[name].js',
    },
    devServer: {
      contentBase: path.resolve(__dirname, '../dist'),
      compress: true,
      clientLogLevel: 'warning',
      overlay: true,
      stats: 'errors-warnings',
      hot: true,
      inline: true,
      // host: '0.0.0.0', // 服务器外部可访问
      // disableHostCheck: true, // 绕过主机检查,不建议这样做，因为不检查主机的应用程序容易受到 DNS 重新连接攻击。
      port: 9000,
      open: true,
      openPage: 'http://localhost:9000',
      // publicPath: '/'
      // proxy: {
      //     "/capi": {
      //         target: "http://devcsigssd.oa.com/",
      //         changeOrigin: true
      //     }
      // }
    },
  })
