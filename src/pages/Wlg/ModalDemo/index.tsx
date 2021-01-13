/**
 * WangLonggang 的 ModalDemo
 * */
import React, { useEffect, useState } from 'react';
import { createPortal, render } from 'react-dom';
import { PageHeader, Button, Tag } from 'antd';
import './index.scss';

const rootId = 'overlay-root';
const Modal = {};

const ModalMain = props => {
  console.log(props);
  return (
    <div className="overlay">
      <div className="Modal">这是一个弹窗</div>
    </div>
  );
};

Modal.alert = (props = {}) => {
  let root = root || document.getElementById(rootId);
  if (!root) {
    root = document.createElement('div');
    root.id = rootId;
    window.root = root;
    document.body.appendChild(root);
  }
  render(createPortal(<ModalMain {...props} />, root), document.getElementById('wlg'));
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
      <div id="wlg" style={{ display: 'none' }}></div>
    </div>
  );
};

export default ModalDemo;
