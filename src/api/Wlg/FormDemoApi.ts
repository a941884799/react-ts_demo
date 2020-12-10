import { createGetApi } from '@utils/api';

/**
 * @name getFormMock
 * @desc 获取模拟的表单配置数据
 * @return {AxiosPromise<any>}
 */

export const getFormMock = createGetApi('/api/getFormConfigs');
