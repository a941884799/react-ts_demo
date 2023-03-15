import axios, { AxiosRequestConfig, AxiosError, AxiosResponse, AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
// 全局提示错误信息
import { handleError } from '@utils/api';

const isProduction = process?.env?.NODE_ENV === 'production';
// 接口公共参数
const publicData = {};
const publicParams = {};

// 创建axios实例
const fetch: AxiosInstance = axios.create({
  baseURL: isProduction ? 'http://localhost:9090' : location.origin, // 设置请求的baseURL
  // headers: {}, // 设置 request headers
  timeout: 30000, // 请求超时时间
});

/** ============== 设置 request 拦截器 ============== **/
fetch.interceptors.request.use((_config): AxiosRequestConfig => {
  const config = { ..._config };
  // 获取并添加token
  const authorization = Cookies.get('authorToken');
  if (authorization) config.headers.authorization = `Bearer ${authorization}`;

  // 添加公共参数
  config.data = Object.assign({}, config.data, publicData);
  config.params = Object.assign({}, config.params, publicParams);

  return config;
});

/** ============== 设置response拦截器 ============== **/
fetch.interceptors.response.use(
  (response: AxiosResponse<unknown>) => {
    const { status, statusText, data } = response;
    // 请求成功
    if (status === 200 && statusText === 'OK' && data?.code === 0 && data?.msg === 'succ') {
      return data?.Response || data;
    }
    // 请求失败
    const { Message, Code } = data?.Error || {};
    handleError({ Message, Code, isAxiosError: false }); // 全局提示错误信息
    return Promise.reject({ response, isAxiosError: false });
  },
  // 请求失败
  (error: AxiosError<unknown>) => {
    handleError(error); // 全局提示错误信息
    return Promise.reject(error);
  },
);

export default fetch;
