/** @format */

const merge = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')

module.exports = env =>
  merge(common(env), {
    mode: 'development',
    devtool: 'inline-source-map', // 可以切换成"inline-cheap-source-map"优化性能，但是不利于debug
    output: {
      filename: 'bundle.js',
    },
    devServer: {
      contentBase: path.resolve(__dirname, '../dist'),
      publicPath: '/',
      compress: true, // 开启gzip压缩
      hot: true, // 自动添加 HMR 插件,热模块更新
      inline: true, // 启用内联模式(inline mode),构建消息将会出现在浏览器控制台,默认为true
      // progress: true, // 输出运行进度
      stats: 'errors-warnings', // 精确控制要显示的包信息，仅显示包中的错误
      clientLogLevel: 'warning', // 使用inline mode时，在开发工具控制台将显示消息
      // // 在浏览器上全屏显示编译的errors或warnings。
      overlay: {
        errors: true,
        // warnings: true,
      },
      disableHostCheck: true, // 绕过主机检查,不建议这样做，因为不检查主机的应用程序容易受到 DNS 重新连接攻击。
      host: 'localhost', // 主机名，默认为localhost,设置0.0.0.0则服务器外部可访问
      port: 9000, // 端口号
      open: true, // 自动打开浏览器
      openPage: 'http://localhost:9000', // 指定要打开的页面
      historyApiFallback: true, // 将404替换成index.html
      // 正向代理
      proxy: [
        {
          '/capi': {
            target: 'http://devcsigssd.oa.com/',
            changeOrigin: true,
            pathRewrite: {'^/capi': ''}, // 重写路径
          },
        },
        {
          context: ['/capi', '/user', '/uploadfile', '/nonstandardApi'],
          target: 'http://devcsigssd.oa.com/',
          changeOrigin: true,
        },
      ],
    },
  })
