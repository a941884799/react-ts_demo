/**
 * @name ErrorBoundary
 * @desc 处理react错误边界
 * @time 2020年12月15日 10:47:14 星期二
 * @param {props} {children} react组件
 * @return  {ReactNode} ErrorBoundary 组件
 */
import React, { Component, PropsWithChildren } from 'react';
import { Result, Button } from 'antd';

class ErrorBoundary extends Component<PropsWithChildren<Record<string, any>>, any> {
  constructor(props: Record<string, any>) {
    super(props);
    this.state = { hasError: false };
  }

  reload: () => void = () => {
    this.setState({ loading: true });
    setTimeout(() => this.setState({ hasError: false, loading: false }), 500);
  };

  // 接收作为参数抛出的错误，并应返回值以更新 state
  static getDerivedStateFromError(): Record<string, boolean> {
    // 更新状态，以便下一个渲染器显示回退UI。
    return { hasError: true };
  }

  /**
   * 在子组件抛出错误后调用此生命周期方法。 它接收两个参数：
   * error - 抛出的错误。
   * info - 包含 componentStack 键的对象，其中包含 有关哪个组件引发错误的信息 。
   */
  componentDidCatch(error: Error /*, info*/): void {
    // 可以将错误记录到错误报告服务
    console.error('error', error);
    // console.error('componentStack', info.componentStack);
  }

  componentDidUpdate(prevProps: Record<string, unknown>): void {
    // Typical usage (don't forget to compare props):
    if (prevProps.children !== this.props.children) this.setState({ hasError: false });
  }

  render(): React.ReactNode {
    const { children } = this.props;
    const { loading, hasError } = this.state;
    if (hasError) {
      return (
        <Result
          status="500"
          title="服务出错"
          subTitle="请刷新重试"
          extra={[
            <Button key={0} type="primary" loading={loading} onClick={this.reload}>
              刷新
            </Button>,
          ]}
        />
      );
    }
    return children;
  }
}

export default ErrorBoundary;
