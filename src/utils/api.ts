import fetch from '@api/fetch';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { message as antdMessage } from 'antd';

type Params = Record<string, unknown>;

/**
 * @desc 创建 post 类型api接口
 * @param {string} path: 接口路径
 * @param {AxiosRequestConfig} config: axios配置
 * @param {Params} params: 接口的参数
 * @return  {Api} 返回一个 post 类型api接口
 */

export const createPostApi =
  (path: string, config: AxiosRequestConfig = {}) =>
  (params: Params = {}): Promise =>
    fetch.post(path, params, config);

/**
 * @name createGetApi
 * @desc 创建 get 类型 api接口
 * @param {string} path: 接口路径
 * @param {AxiosRequestConfig} config: axios配置
 * @param {Params} params: 接口的参数
 * @return  {Api} 返回一个get类型api接口
 */

export const createGetApi =
  (path: string, config: AxiosRequestConfig = {}) =>
  (params: Params = {}): Promise =>
    fetch.get(path, { params, ...config });

// 扩展错误信息类型
interface Error extends AxiosError {
  Code?: string; // 后端自定义错误码
  Message?: string; // 后端自定义错误提示信息
}

// 根据http状态码映射提示信息
export const ErrorStatusMap: Record<unknown, string> = {
  500: '服务器异常，请稍后再试(500)',
  502: '服务器异常，请稍后再试(502)',
  503: '服务器异常，请稍后再试(503)',
  504: '服务器异常，请稍后再试(504)',
  404: '未找到服务内容(404)',
};

// 转中文
export const messageMap = {
  'Network Error': '网络错误',
};

// 根据自定义错误码映射提示信息
export const ErrorCodeMap: Record<unknown, string> = {
  InternalError: '内部错误，请稍后重试',
};

/**
 * @name handleError
 * @desc 处理 api 接口的错误信息,进行全局提示
 * @param {Error} error 错误信息
 */

export const handleError = (error: Error): void => {
  const { isAxiosError, response, message, Message, Code, config } = error;
  // 此接口错误信息 不使用 handleError 进行全局提示
  if (config?.noHandleError) return;
  // axios错误
  if (isAxiosError) {
    antdMessage.error(ErrorStatusMap[response?.status] || messageMap[message] || message);
    // 自定义错误
  } else {
    antdMessage.error(ErrorCodeMap[Code] || Message);
  }
};
