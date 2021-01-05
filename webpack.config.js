const modeMap = {
  dev: './build/webpack.dev.js',
  prod: './build/webpack.prod.js',
};

// 测试webpack构建速度
const isSmp = false; // 是否测试构建速度
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

module.exports = args => {
  const { mode } = args;
  const config = require(modeMap[mode] || modeMap.dev)(args, process);
  if (isSmp) return smp.wrap(config);
  return config;
};
