// 处理错误信息
import { AxiosError } from 'axios';
import { message as MessageFn } from 'antd';

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

const handleError = (error: AxiosError): void => {
	const { response, message, Message, Code } = error;
	const msg = ErrorStatusMap[response?.status] || ErrorCodeMap[Code] || Message || message;
	return MessageFn.error(msg || '服务器异常，请稍后再试');
};

export default handleError;
