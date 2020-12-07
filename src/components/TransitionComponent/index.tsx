/**
 * @name TransitionComponent
 * @desc 转场过度组件
 * @author 王龙岗
 * @time 2020年11月10日 14:25:07 星期二
 * @param {ReactNode} Loding 自定义Loding组件,可不传
 * @param {number} delay 延时,防闪烁,默认200毫秒
 */
import React, { ReactNode, useEffect, useState } from 'react';
import { Spin } from 'antd';
import './index.scss';

const TransitionComponent = ({ Loding, delay = 200 }: { Loding?: ReactNode; delay?: number }): ReactNode => {
  const [isShow, setIsShow] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsShow(true), delay);
    return () => clearTimeout(timer);
  }, []);
  if (!isShow) return <></>;
  return Loding ? <Loding /> : <Spin className="TransitionComponent" tip="正在加载......" />;
};

export default TransitionComponent;
