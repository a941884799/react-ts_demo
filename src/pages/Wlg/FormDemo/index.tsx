/**
 * WangLonggang 的 FormDemo
 * */
import React, { ReactNode, Fragment, useEffect } from 'react';
import { useStateSafe } from '@utils/hooks';
import { Form, Spin, Input, PageHeader, Radio, Button, Checkbox, Tag } from 'antd';
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

// 记录的表单值，反正跳转页面时被销毁
let recordedValues = {};

const formLayout = {
	labelAlign: 'right',
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
	const [FieldsValue, setFieldsValue] = useStateSafe(recordedValues);
	// 表单配置数据加载状态
	const [Loading, setLoading] = useStateSafe(true);
	// 提交表单且数据验证成功后回调事件
	const onFinish = values => {
		console.log('onFinish', values);
	};
	// 重置表单
	const onReset = () => {
		form.resetFields();
		recordedValues = {};
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
						// 渲染子控件(过滤掉不存在children(子控件)或没被选中的项)
						const childrenList = [];
						config.options
							?.filter(i => i.children && (FieldsValue[name] === i.itemId || FieldsValue[name]?.includes?.(i.itemId)))
							?.forEach(({ children }) => childrenList.push(...children));
						if (childrenList.length === 0) return <></>;
						if (type === 'checkbox') {
							return (
								<Form.Item label={label + '值'} className="vertical-form-item">
									{render(childrenList, name)}
								</Form.Item>
							);
						}
						return render(childrenList, name);
					})()}
				</Fragment>
			);
		});
	// 进入页面，默认请求表单配置数据，填充记录的表单值
	useEffect(() => {
		getConfigs();
		form.setFieldsValue(recordedValues);
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
					onValuesChange={(changedFields, allFields) => {
						recordedValues = { ...allFields };
						setFieldsValue({ ...allFields });
					}}
					onFinish={onFinish}
				>
					<Form.Item label="动态表单练习"></Form.Item>
					{render(Configs)}
					<Form.Item key="submit" label=" " colon={false}>
						<Button type="primary" htmlType="submit">
							提交
						</Button>
						<Button htmlType="button" onClick={onReset}>
							重置
						</Button>
					</Form.Item>
				</Form>
			</Spin>
		</div>
	);
};

export default FormDemo;
