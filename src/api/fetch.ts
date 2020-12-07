import axios, { AxiosRequestConfig, AxiosError, AxiosResponse, AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
// 全局提示错误信息
import { handleError } from '@utils/api';

// 获取当前网页域名
const baseURL = location.href.replace(/^(https?:\/\/.*?)(\/.*)?$/, ($0, $1) => $1);

// 接口公共参数
const publicData = {};
const publicParams = {};

// 创建axios实例
const fetch: AxiosInstance = axios.create({
  baseURL, // 设置请求的baseURL
  // baseURL: baseURL.replace(/:\d+/, ':80'), // 调用 node_demo 提供的服务
  // headers: {}, // 设置 request headers
  timeout: 30000, // 请求超时时间
});

/** ============== 设置 request 拦截器 ============== **/
fetch.interceptors.request.use(
  (_config): AxiosRequestConfig => {
    const config = { ..._config };
    // 获取并添加token
    const authorization = Cookies.get('authorToken');
    if (authorization) config.headers.authorization = `Bearer ${authorization}`;

    // 添加公共参数
    config.data = Object.assign({}, config.data, publicData);
    config.params = Object.assign({}, config.params, publicParams);

    return config;
  },
);

/** ============== 设置response拦截器 ============== **/
fetch.interceptors.response.use(
  (response: AxiosResponse<unknown>) => {
    const { status, statusText, data } = response;
    console.log('response', response);
    // 请求成功
    if (status === 200 && statusText === 'OK') {
      return data;
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
