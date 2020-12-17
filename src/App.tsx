import React, { ReactNode, useEffect } from 'react';
import Layout from '@src/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserInfo } from '@store/actions/common';
const App = (): ReactNode => {
  const dispatch = useDispatch();
  // 获取用户信息
  const UserInfo = useSelector(state => state.UserInfo);
  useEffect(() => {
    if (!UserInfo) dispatch(fetchUserInfo);
  }, []);
  return <Layout />;
};

export default App;
