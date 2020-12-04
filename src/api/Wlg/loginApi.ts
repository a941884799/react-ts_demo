import { createGetApi } from '@utils/api';
/**
 * @name getUserInfo
 * @desc 获取用户信息
 * @author 王龙岗
 * @time 2020年11月09日 16:09:29 星期一
 * @return {AxiosPromise<UserInfo>}
 */

export const getUserInfo = createGetApi('/wlg', {
	noHandleError: true, // 不使用 handleError 全局提示错误信息
});

// export const getUserInfo = createGetApi('/static/userInfo.json');
