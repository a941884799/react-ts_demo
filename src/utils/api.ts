import fetch from '@api/fetch';
import { AxiosError } from 'axios';
import { message as antdMessage } from 'antd';

type Params = Record<string, unknown>;
/**
 * @name createPostApi
 * @desc 创建 post 类型 api接口
 * @author 王龙岗
 * @time 2020年11月09日 16:14:03 星期一
 * @param {string} path: 接口路径
 * @param {Object} params: 接口的参数
 * @return  {Api}
 */

export const createPostApi = (path: string) => (params: Params = {}): Promise => fetch.post(path, params);

/**
 * @name createGetApi
 * @desc 创建 get 类型 api接口
 * @author 王龙岗
 * @time 2020年11月09日 16:15:00 星期一
 * @param {string} path: 接口路径
 * @param {Object} params: 接口的参数
 * @return  {Api}
 */

export const createGetApi = (path: string) => (params: Params = {}): Promise => fetch.get(path, { params });

/**
 * @name handleError
 * @desc 处理 api 接口的错误信息,进行全局提示
 * @author 王龙岗
 * @time 2020年11月09日 16:34:28 星期一
 * @param {AxiosError} error
 */
const ErrorStatusMap: Record<unknown, string> = {
	500: '服务器异常，请稍后再试(500)',
	502: '服务器异常，请稍后再试(502)',
	503: '服务器异常，请稍后再试(503)',
	504: '服务器异常，请稍后再试(504)',
	404: '未找到服务内容(404)',
};

const ErrorCodeMap: Record<unknown, string> = {
	InternalError: '内部错误，请稍后重试',
};

export const handleError = (error: AxiosError): void => {
	const { response, message, Message, Code } = error;
	const msg = ErrorStatusMap[response?.status] || ErrorCodeMap[Code] || Message || message;
	return antdMessage.error(msg || '服务器异常，请稍后再试');
};
