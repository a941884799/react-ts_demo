/**
 * WangLonggang 的 ReduxDemo
 * */
import React from 'react';
// import {useDispatch, useSelector} from 'react-redux'
// import {Types, add} from '@store/actions/common'
import {
	Form,
	Select,
	PageHeader,
	InputNumber,
	Switch,
	Radio,
	Slider,
	Button,
	Upload,
	Rate,
	Checkbox,
	Tag,
} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import './index.scss';

const formLayout = {
	labelAlign: 'right',
	labelCol: { span: 2 },
	wrapperCol: { span: 7 },
};

const normFile = e => {
	console.log('Upload event:', e);
	if (Array.isArray(e)) {
		return e;
	}
	return e && e.fileList;
};

/**
 * 页面主组件
 */
const ReduxDemo = () => {
	const onFinish = values => {
		console.log(values);
	};
	const [form] = Form.useForm();
	return (
		<div className="page-WlgReduxDemo">
			<PageHeader title="表单练习" subTitle="This is Form demo" tags={<Tag color="red">demo</Tag>} />
			<Form
				name="validate_other"
				{...formLayout}
				form={form}
				onFinish={onFinish}
				initialValues={{
					rate: 3.5,
				}}
			>
				<Form.Item label="纯文本项">
					<span className="ant-form-text">表单demo</span>
				</Form.Item>
				<Form.Item name="layout" label="表单布局" rules={[{ required: true, message: '请选择表单布局' }]}>
					<Radio.Group
						optionType="button"
						options={[
							{ label: '水平', value: 'horizontal' },
							{ label: '垂直', value: 'vertical' },
							{ label: '内联', value: 'inline' },
						]}
					/>
				</Form.Item>
				<Form.Item name="nationality" label="民族" hasFeedback rules={[{ required: true, message: '请选择你的民族!' }]}>
					<Select
						placeholder="请选择一个民族"
						options={[
							{ label: '汉族', value: '汉族' },
							{ label: '藏族', value: '藏族' },
							{ label: '壮族', value: '壮族' },
							{ label: '苗族', value: '苗族' },
							{ label: '其它', value: '其它' },
						]}
					/>
				</Form.Item>
				<Form.Item name="sex" label="性别">
					<Radio.Group>
						<Radio value={1}>男</Radio>
						<Radio value={2}>女</Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item label="年龄">
					<Form.Item name="age" noStyle>
						<InputNumber min={1} max={100} />
					</Form.Item>
					<span className="ant-form-text"> 1-100</span>
				</Form.Item>
				<Form.Item name="switch" label="是否单身" valuePropName="checked">
					<Switch checkedChildren="是" unCheckedChildren="否" />
				</Form.Item>
				<Form.Item name={['favorite', 'hobby']} label="爱好">
					<Checkbox.Group
						style={{ width: '100%' }}
						options={[
							{ label: '抽烟', value: 1 },
							{ label: '喝酒', value: 2 },
							{ label: '烫头', value: 3 },
							{ label: '敲代码', value: 4 },
							{ label: '***', value: 5, disabled: true },
						]}
					/>
				</Form.Item>
				<Form.Item
					name={['favorite', 'color']}
					label="喜欢的颜色"
					rules={[
						{ required: true, message: '请选择你喜欢的颜色!' },
						{ type: 'array', message: '值类型不对!' },
					]}
				>
					<Select
						mode="multiple"
						placeholder="请选择你喜欢的颜色"
						options={[
							{ label: '红色', value: 'red' },
							{ label: '绿色', value: 'green' },
							{ label: '蓝色', value: 'blue' },
						]}
					/>
				</Form.Item>
				<Form.Item name="temperature" label="体温">
					<Slider
						max={100}
						included={false}
						tipFormatter={value => `${value}°C`}
						marks={{
							0: '0°C',
							26: '26°C',
							37: '37°C',
							100: {
								style: { color: '#f50' },
								label: <strong>100°C</strong>,
							},
						}}
					/>
				</Form.Item>
				<Form.Item name="rate" label="自评">
					<Rate />
				</Form.Item>
				<Form.Item
					name="upload"
					label="上传"
					valuePropName="fileList"
					getValueFromEvent={normFile}
					extra="longgggggggggg"
				>
					<Upload name="logo" action="/upload.do" listType="picture">
						<Button icon={<UploadOutlined />}>点击上传</Button>
					</Upload>
				</Form.Item>

				<Form.Item label="拖拽上传">
					<Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
						<Upload.Dragger name="files" action="/upload.do">
							<p className="ant-upload-drag-icon">
								<InboxOutlined />
							</p>
							<p className="ant-upload-text">单击或拖动文件到该区域以上传</p>
							<p className="ant-upload-hint">支持单次或批量上传</p>
						</Upload.Dragger>
					</Form.Item>
				</Form.Item>
				<Form.Item wrapperCol={{ span: 12, offset: 2 }}>
					<Button type="primary" htmlType="submit">
						提交
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default ReduxDemo;
