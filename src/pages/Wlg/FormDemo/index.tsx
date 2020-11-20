/**
 * WangLonggang 的 FormDemo
 * */
import React, { ReactNode, Fragment, useState, useEffect } from 'react';
import { useStateSafe } from '@utils/hooks';
// import {useDispatch, useSelector} from 'react-redux'
// import {Types, add} from '@store/actions/common'
import { Form, Spin, Input, PageHeader, Radio, Button, Checkbox, Tag, Select } from 'antd';
// api接口
import { getFormMock } from '@api/Wlg/FormDemoApi';
import './index.scss';

interface Config {
	label: string;
	type: string;
	parantItemId?: number | string; // 父控件的Id值
	options: [
		{
			itemName: string;
			itemId: number | string;
			children?: [Config];
		},
	];
}

const formLayout = {
	labelAlign: 'right',
	// labelCol: { span: 3 },
	wrapperCol: { span: 16 },
};

// 将 itemName itemId 转为 label value
const mapOptions = (options: Array<{ itemName: string; itemId: number }>) =>
	options.map(({ itemName: label, itemId: value }) => ({ label, value }));

/**
 * 页面主组件
 */
const FormDemo = (): ReactNode => {
	// 经 Form.useForm() 创建的 form 控制实例，不提供时会自动创建
	const [form] = Form.useForm();
	// 表单配置数据
	const [Configs, setConfigs] = useStateSafe<[Config] | []>([]);
	// 当前表单值
	const [FieldsValue, setFieldsValue] = useStateSafe({});
	// 表单配置数据加载状态
	const [Loading, setLoading] = useStateSafe(true);
	// 提交表单且数据验证成功后回调事件
	const onFinish = values => {
		console.log('onFinish', values);
	};
	// 加载表单配置数据
	const getConfigs = async () => {
		setLoading(true);
		try {
			const res = await getFormMock();
			if (res?.data) setConfigs(res.data);
		} catch (error) {}
		setLoading(false);
	};
	// parantName 父控件name字段
	const render = (Configs: [Config]) =>
		Configs.map((config: Config) => {
			let Dom;
			const { label, type, props = {} } = config;
			const name = config.name || label; // 配置数据没有写name字段，暂用 label 代替
			switch (type) {
				case 'string':
					Dom = (
						<Form.Item label={label} name={name} {...props}>
							<span className="ant-form-text">{config.value}</span>
						</Form.Item>
					);
					break;
				case 'radio':
					Dom = (
						<Form.Item label={label} name={name} {...props}>
							<Radio.Group options={mapOptions(config.options || [])} />
						</Form.Item>
					);
					break;
				case 'checkbox':
					Dom = (
						<Form.Item label={label} name={name} {...props}>
							<Checkbox.Group options={mapOptions(config.options || [])} />
						</Form.Item>
					);
					break;
				case 'input':
					console.log(props);
					Dom = Array.isArray(config.options) ? (
						<Form.Item label={label} {...props}>
							<Input.Group compact>
								{config.options.map(({ props = {}, childrenProps = {} } = {}, index) => (
									<Form.Item key={index} name={name[index]} {...props}>
										<Input {...childrenProps} />
									</Form.Item>
								))}
							</Input.Group>
						</Form.Item>
					) : (
						<Form.Item label={label} name={name} {...props}>
							<Input />
						</Form.Item>
					);
					break;
			}
			return (
				<Fragment key={label}>
					{Dom}
					{(() => {
						// 渲染子控件(过滤掉存在子控件或没被选中的)
						const childrenList = [];
						config.options
							?.filter(i => i.children && (FieldsValue[name] === i.itemId || FieldsValue[name]?.includes?.(i.itemId)))
							?.forEach(({ children }) => childrenList.push(...children));
						if (childrenList.length === 0) return <></>;
						if (type === 'checkbox') {
							return (
								<Form.Item label={label + '值'} className="fbxList">
									{render(childrenList, name)}
								</Form.Item>
							);
						}
						return render(childrenList, name);
					})()}
				</Fragment>
			);
		});
	// 进入页面，默认表单配置数据
	useEffect(() => {
		getConfigs();
	}, []);
	return (
		<div className="page-WlgFormDemo">
			<PageHeader title="表单练习" subTitle="This is Form demo" tags={<Tag color="red">demo</Tag>} />
			<Spin tip="正在加载表单" spinning={Loading}>
				<Form
					name="WlgFormDemo"
					{...formLayout}
					form={form}
					initialValues={{}}
					onValuesChange={(changedFields, allFields) => setFieldsValue(allFields)}
					onFinish={onFinish}
				>
					<Form.Item label="动态表单练习"></Form.Item>
					{render(Configs)}
					<Form.Item key="submit" label=" " colon={false}>
						<Button type="primary" htmlType="submit">
							提交
						</Button>
					</Form.Item>
				</Form>
			</Spin>
		</div>
	);
};

export default FormDemo;
