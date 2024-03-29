const merge = require('webpack-merge');
const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin'); // react组件热更新
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (args, process) => {
  const commonConfig = require('./webpack.common.js')(args, process);
  return merge(commonConfig, {
    mode: 'development',
    devtool: 'source-map', // 可以切换成"inline-source-map"，但是对性能有影响
    plugins: [
      // 用于Webpack的ESLint插件
      new ESLintPlugin({
        fix: false,
        extensions: ['js', 'ts', 'tsx'],
        files: 'src',
        threads: true, // 在线程池中运行lint任务
        quiet: true, // 忽略警告
      }),
      // react 热更新
      new ReactRefreshWebpackPlugin({
        overlay: false, // 禁用此插件的错误覆盖
      }),
    ],
    devServer: {
      contentBase: path.resolve(__dirname, '../dist'),
      hot: true, // 自动添加 HMR 插件,热模块更新
      // hotOnly: true, // 与 hot类似，但是编译失败不自动刷新
      // publicPath: '/',
      // compress: true, // 为每个静态文件开启 gzip 压缩
      // stats: 'errors-only', // 控制台只显示错误信息
      // progress: true, // 将运行进度输出到控制台(会导致构建速度缓慢)
      inline: true, // 启用内联模式(inline mode),构建消息将会出现在浏览器控制台,默认为true
      // clientLogLevel: 'silent', // 使用inline mode时，在开发工具控制台将显示消息,设为'silent'可关闭日志
      overlay: true, // true：显示errors信息。{ errors: true, warnings: true } ：显示警告和错误信息
      historyApiFallback: true,
      disableHostCheck: true, // 绕过主机检查,不建议这样做，因为不检查主机的应用程序容易受到 DNS 重新连接攻击。
      port: 9000, // 端口号
      open: true, // 自动打开浏览器
      openPage: 'http://my-react-demo.com:9000', // 指定要打开的页面(需要配置hosts代理: 127.0.0.1	my-react-demo.com)
      // 正向代理
      proxy: [
        {
          context: ['/api'],
          target: 'http://localhost:9000',
          changeOrigin: true, // 默认值：false - true为开启跨域代理
          pathRewrite: { '^/api': '/api' }, // 重写路径
          // secure: false, // 接受运行在 HTTPS 上，且使用了无效证书的后端服务器
        },
        // {
        //   context: ['/api1', '/api2', '/api3', '/api4', '/api5'],
        //   target: 'http://localhost:3000',
        //   changeOrigin: true,
        //   pathRewrite: { '^/api[1-5]': '' },
        // },
      ],
    },
  });
};
