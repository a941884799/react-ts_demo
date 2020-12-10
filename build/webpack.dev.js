const merge = require('webpack-merge');
const commonConfig = require('./webpack.common')({ mode: 'dev' });
const path = require('path');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'source-map', // 可以切换成"inline-cheap-source-map"优化性能，但是不利于debug
  output: {
    filename: '[name].js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    compress: true, // 为每个静态文件开启 gzip 压缩
    hot: true, // 自动添加 HMR 插件,热模块更新
    inline: true, // 启用内联模式(inline mode),构建消息将会出现在浏览器控制台,默认为true
    stats: 'errors-only',
    // progress: true, // 将运行进度输出到控制台(会导致构建速度缓慢)
    // clientLogLevel: 'silent', // 使用inline mode时，在开发工具控制台将显示消息,设为'silent'可关闭日志
    // 在浏览器上全屏显示编译的errors或warnings。
    overlay: { errors: true, warnings: false },
    disableHostCheck: true, // 绕过主机检查,不建议这样做，因为不检查主机的应用程序容易受到 DNS 重新连接攻击。
    host: 'localhost', // 主机名，默认为localhost,设置0.0.0.0则服务器外部可访问
    port: 9000, // 端口号
    open: true, // 自动打开浏览器
    openPage: 'http://localhost:9000', // 指定要打开的页面
    // 正向代理
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost',
        changeOrigin: true, // 默认值：false - true为开启跨域代理
        pathRewrite: { '^/api': '/api' }, // 重写路径
        // secure: false, // 接受运行在 HTTPS 上，且使用了无效证书的后端服务器
      },
      {
        context: ['/api1', '/api2', '/api3', '/api4', '/api5'],
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/api[1-5]': '' },
      },
    ],
  },
});
