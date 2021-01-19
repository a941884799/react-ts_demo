import React, { ReactNode } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
const GoBack = (props = {}): ReactNode => (
  <ArrowLeftOutlined
    className="GoBack primary-color"
    style={{ fontSize: 16, fontWeight: 700, marginRight: 20 }}
    onClick={() => window.history.back()}
    {...props}
  />
);

export default GoBack;
