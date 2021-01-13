import React, { ReactNode } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
const GoBack = (): ReactNode => (
  <ArrowLeftOutlined
    className="GoBack primary-color"
    style={{ fontSize: 16, fontWeight: 700, marginRight: 30 }}
    onClick={() => window.history.back()}
  />
);

export default GoBack;
