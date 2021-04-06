const globalConfig = require(`./${mode || 'dev'}`).default;

export type GlobalConfig = {
  env: 'prod' | 'dev';
  baseURL: string;
};

export default globalConfig;
