/** @format */
import { DispatchProp } from 'react-redux';
import { getUserInfo } from '@api/Wlg/loginApi';
// todos
const ADD_TODO = 'ADD_TODO';

// counter
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const UPDATA = 'UPDATA';

// 获取用户信息
const UPTATAUSERINFO = 'UPTATAUSERINFO';
export const fetchUserInfo = async (dispatch: DispatchProp): void => {
  try {
    const res = await getUserInfo();
    if (res?.UserInfo) dispatch({ type: UPTATAUSERINFO, UserInfo: res.UserInfo });
  } catch (error) {
    console.log(error, 'error');
  }
};

export const ActionTypes = {
  ADD_TODO,
  INCREMENT,
  DECREMENT,
  UPDATA,
  // 更新用户信息
  UPTATAUSERINFO,
};
