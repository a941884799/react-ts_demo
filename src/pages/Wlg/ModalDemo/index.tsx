/**
 * WangLonggang 的 ModalDemo
 * */
import React from 'react';
import { createPortal, render } from 'react-dom';
import { PageHeader, Button, Tag } from 'antd';
import { getOverlayRoot } from '@utils/getOverlayRoot';
import './index.scss';

const Modal = {};

const ModalMain = props => {
  console.log(props);
  const Dom = (
    <div className="Modal">
      这是一个弹窗
      {props.children}
    </div>
  );
  return createPortal(Dom, getOverlayRoot());
};

Modal.alert = (props = {}) => {
  const el = document.createElement('div');
  render(<ModalMain {...props} />, el);
};

const ModalDemo = props => {
  console.log(props);
  return (
    <div className="page-ModalDemo">
      <PageHeader
        title="用ReactDom.createPortal创建弹窗组件"
        tags={<Tag color="green">demo</Tag>}
        extra={<Button onClick={() => Modal.alert(props)}>打开弹窗</Button>}
      />
    </div>
  );
};

export default ModalDemo;
