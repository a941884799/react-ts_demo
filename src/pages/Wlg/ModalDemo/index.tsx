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
  return <div className="Modal">这是一个弹窗</div>;
};

Modal.alert = () => {
  let root = root || document.getElementById(rootId);
  if (!root) {
    root = document.createElement('div');
    root.id = rootId;
    window.root = root;
    document.body.appendChild(root);
  }
  render(ModalMain, root);
};

const ModalDemo = props => {
  console.log(props);
  return (
    <div className="page-ModalDemo">
      <Button onClick={Modal.alert}>打开弹窗</Button>
    </div>
  );
};

export default ModalDemo;
