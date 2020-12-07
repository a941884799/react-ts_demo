import { createGetApi } from '@utils/api';
/**
 * @name getUserInfo
 * @desc 获取用户信息
 * @author 王龙岗
 * @time 2020年11月09日 16:09:29 星期一
 * @return {AxiosPromise<UserInfo>}
 */
const baseURL = location.href.replace(/^(https?:\/\/.*?)(\/.*)?$/, ($0, $1) => $1);
export const getUserInfo = createGetApi('/wlg', {
  noHandleError: false, // 不使用 handleError 全局提示错误信息
  baseURL: baseURL.replace(/:\d+/, ':80'), // 调用 node_demo 提供的服务
});

// export const getUserInfo = createGetApi('/static/userInfo.json');
